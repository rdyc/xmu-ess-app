import { IHrCornerBlogGetAllFilter } from '@hr/classes/filters';
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

import { HrCornerBlogListView } from './HrCornerBlogListView';

interface IOwnOption {
  
}

interface IOwnState {
  fields: ICollectionValue[];
  page?: number;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
  setPageOne: StateHandler<IOwnState>;
  setPageNext: StateHandler<IOwnState>;
  setPagePrevious: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
}

export type HrCornerBlogListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps
  & WithStyles<typeof styles>
  & WithUser
  & WithHrCornerBlog;

const createProps: mapper<IOwnOption, IOwnState> = (props: HrCornerBlogListProps): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(IHrCompetencyField).map(key => ({
      value: key,
      name: IHrCompetencyField[key]
    })),
  };

  return state;
};

const stateUpdaters: StateUpdaters<HrCornerBlogListProps, IOwnState, IOwnStateUpdater> = {
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

const handlerCreators: HandleCreators<HrCornerBlogListProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCornerBlogListProps) => () => {
    const { loadAllRequest } = props.hrCornerBlogDispatch;

    const filter: IHrCornerBlogGetAllFilter = {
      page: props.page,
      direction: 'descending'
    };

    loadAllRequest({
      filter
    });
  },
  handleOnLoadApiSearch: (props: HrCornerBlogListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.hrCornerBlogState.all;
    const { loadAllRequest } = props.hrCornerBlogDispatch;
    const { user } = props.userState;

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
        loadAllRequest({
          filter
        });
      }
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCornerBlogListProps, IOwnState> = {
  componentDidMount() {
    this.props.handleOnLoadApi();
  },
  componentDidUpdate(prevProps: HrCornerBlogListProps) {
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

export const HrCornerBlogList = compose<HrCornerBlogListProps, IOwnOption>(
  setDisplayName('HrCornerBlogList'),
  withUser,
  withRouter,
  withHrCornerBlog,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(HrCornerBlogListView);