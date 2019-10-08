// import { IHrCornerBlogGetAllByCategoryFilter } from '@hr/classes/filters';
// import { IHrCornerBlogCategory } from '@hr/classes/response';
import { IHrCornerBlogGetAllByCategoryFilter } from '@hr/classes/filters';
import { IHrCompetencyField } from '@hr/classes/types';
import { WithHrCornerBlog, withHrCornerBlog } from '@hr/hoc/withHrCornerBlog';
import { ICollectionValue } from '@layout/classes/core';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { HrCornerBlogByCategoryListView } from './HrCornerBlogByCategoryListView';

// interface BlogItem {
//   items: IHrCornerBlogCategory[];
// }

interface IOwnOption {
  categorySlug: string;
}

interface IOwnState {
  fields: ICollectionValue[];
  // blogs: BlogItem[];
  page?: number;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
  setPageOne: StateHandler<IOwnState>;
  // setPageEnd: StateHandler<IOwnState>;
  setPageNext: StateHandler<IOwnState>;
  setPagePrevious: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
}

export type HrCornerBlogByCategoryListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps<IOwnOption>
  & WithStyles<typeof styles>
  & WithUser
  & WithHrCornerBlog;

const createProps: mapper<IOwnOption, IOwnState> = (props: HrCornerBlogByCategoryListProps): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(IHrCompetencyField).map(key => ({
      value: key,
      name: IHrCompetencyField[key]
    })),
    // blogs: []
  };

  return state;
};

const stateUpdaters: StateUpdaters<HrCornerBlogByCategoryListProps, IOwnState, IOwnStateUpdater> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setPageNext: (state: IOwnState) => () => ({
    page: (state.page || 1) + 1
  }),
  setPagePrevious: (state: IOwnState) => () => ({
    page: (state.page || 1) > 1 ? (state.page || 1) - 1 : 1
  }),
  setPageOne: (state: IOwnState) => () => ({
    page: 1
  }),
};

const handlerCreators: HandleCreators<HrCornerBlogByCategoryListProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCornerBlogByCategoryListProps) => () => {
    const { loadAllByCategoryRequest } = props.hrCornerBlogDispatch;
    const categorySlug: string = props.match.params.categorySlug;
    
    const filter: IHrCornerBlogGetAllByCategoryFilter = {
      page: props.page,
    };
    
    loadAllByCategoryRequest({
      categorySlug,
      filter
    });
  },
  handleOnLoadApiSearch: (props: HrCornerBlogByCategoryListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.hrCornerBlogState.allByCategory;
    const { loadAllByCategoryRequest } = props.hrCornerBlogDispatch;
    const { user } = props.userState;
    const categorySlug: string = props.match.params.categorySlug;

    if (user && !isLoading) {
      // predefined filter
      const filter = {
        ...request && request.filter,
        find,
        findBy,
        page: undefined
      };
      
      // compare request
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (shouldLoad) {
        loadAllByCategoryRequest({
          filter,
          categorySlug
        });
      }
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCornerBlogByCategoryListProps, IOwnState> = {
  componentDidMount() {
    const { request } = this.props.hrCornerBlogState.allByCategory;
    const categorySlug = this.props.match.params.categorySlug;
    // const { blogs } = this.props;

    if (!request || (request && request.categorySlug !== categorySlug)) {
      this.props.handleOnLoadApi();
    }
  },
  componentWillUpdate(nextProps: HrCornerBlogByCategoryListProps) {
    // const { blogs } = this.props;
    // const { response: thisResponse } = this.props.hrCornerBlogState.allByCategory;
    // const { response: nextResponse } = nextProps.hrCornerBlogState.allByCategory;

    // if (thisResponse !== nextResponse) {
    //   if (nextResponse && nextResponse.data) {
    //     blogs.push({
    //       items: nextResponse.data
    //     });
    //   }
    // }
  },
  componentDidUpdate(prevProps: HrCornerBlogByCategoryListProps) {
    const isChanged = !shallowEqual(
      {
        page: this.props.page,
      }, 
      {
        page: prevProps.page,
      }
    );

    if (isChanged) {
      this.props.handleOnLoadApi();
    }
  }
};

export const HrCornerBlogByCategoryList = compose<HrCornerBlogByCategoryListProps, IOwnOption>(
  setDisplayName('HrCornerBlogByCategoryList'),
  withUser,
  withRouter,
  withHrCornerBlog,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(HrCornerBlogByCategoryListView);