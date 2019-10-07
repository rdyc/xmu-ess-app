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
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { HrCornerBlogDetailView } from './HrCornerBlogDetailView';

interface IOwnOption {
  pageSlug: string;
}

interface IOwnState {
  fields: ICollectionValue[];
  isReload: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnReload: () => void;
  handleOnLoadApi: (category: string) => void;
  handleOnLoadAllByCategory: (category: string) => void;
}

export type HrCornerBlogDetailProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps<IOwnOption>
  & WithStyles<typeof styles>
  & WithUser
  & WithHrCornerBlog;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(IHrCompetencyField).map(key => ({
      value: key,
      name: IHrCompetencyField[key]
    })),
    isReload: false
  };

  return state;
};

const stateUpdaters: StateUpdaters<HrCornerBlogDetailProps, IOwnState, IOwnStateUpdater> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
};

const handlerCreators: HandleCreators<HrCornerBlogDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCornerBlogDetailProps) => (category: string) => {
    // const { user } = props.userState;
    const { loadDetailRequest } = props.hrCornerBlogDispatch;
    const { isLoading, request } = props.hrCornerBlogState.detail;
    const pageSlug: string = props.match.params.pageSlug;

    if (!isLoading) {
      loadDetailRequest({
        pageSlug,
        categorySlug: request ? request.categorySlug : category
      });
      props.stateUpdate({
        isReload: false
      });
    }
  },
  handleOnLoadAllByCategory: (props: HrCornerBlogDetailProps) => (category: string) => {
    // const { user } = props.userState;
    const { loadAllByCategoryRequest } = props.hrCornerBlogDispatch;
    const { isLoading } = props.hrCornerBlogState.allByCategory;

    if (!isLoading) {
      loadAllByCategoryRequest({
        categorySlug: category
      });
    }
  },
  handleOnReload: (props: HrCornerBlogDetailProps) => () => {
    props.stateUpdate({
      isReload: true
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<HrCornerBlogDetailProps, IOwnState> = {
  componentDidMount() {
    if (this.props.location.state) {
      this.props.handleOnLoadApi(this.props.location.state.category);
      this.props.handleOnLoadAllByCategory(this.props.location.state.category);
    }
  },
  componentWillUpdate(nextProps: HrCornerBlogDetailProps) {
    console.log(this.props.location);
  },
  componentDidUpdate(prevProps: HrCornerBlogDetailProps) {
    const { pageSlug: thisSlug } = this.props.match.params;
    const { pageSlug: prevSlug } = prevProps.match.params;

    if (thisSlug !== prevSlug || this.props.isReload) {
      if (this.props.location.state) {
        this.props.handleOnLoadApi(this.props.location.state.category);
      }
    }
  }
};

export const HrCornerBlogDetail = compose<HrCornerBlogDetailProps, IOwnOption>(
  setDisplayName('HrCornerBlogDetail'),
  withUser,
  withRouter,
  withHrCornerBlog,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(HrCornerBlogDetailView);