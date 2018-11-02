import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { ProjectRegistrationField } from '@project/classes/types';
import { ProjectAssignmentListView } from '@project/components/assignment/list/ProjectAssignmentListView';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

interface OwnHandlers {
  handleGoToDetail: (projectUid: string) => void;
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleReloading: () => void;
  handleChangeSize: (value: number) => void;
  handleChangeOrder: (field: IListBarField) => void;
  handleChangeSort: (direction: SortDirection) => void;
}

interface OwnOptions {
  orderBy?: string | undefined;
  direction?: string | undefined;
  page?: number | undefined;
  size?: number | undefined;
}

interface OwnState {
  orderBy: string | undefined;
  direction: string | undefined;
  page: number;
  size: number;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateNext: StateHandler<OwnState>;
  statePrevious: StateHandler<OwnState>;
  stateReloading: StateHandler<OwnState>;
  stateOrdering: StateHandler<OwnState>;
  stateSorting: StateHandler<OwnState>;
  stateSizing: StateHandler<OwnState>;
}

export type ProjectAssignmentListProps 
  = WithProjectAssignment
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<ProjectAssignmentListProps, OwnState> = (props: ProjectAssignmentListProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.projectAssignmentState.all;

  return { 
    orderBy: request && request.filter && request.filter.orderBy || orderBy,
    direction: request && request.filter && request.filter.direction || direction,
    page: request && request.filter && request.filter.page || page || 1, 
    size: request && request.filter && request.filter.size || size || 10,
  };
};

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  stateNext: (prevState: OwnState) => () => ({
    page: prevState.page + 1,
  }),
  statePrevious: (prevState: OwnState) => () => ({
    page: prevState.page - 1,
  }),
  stateReloading: (prevState: OwnState) => () => ({
    page: 1,
  }),
  stateOrdering: (prevState: OwnState) => (field: IListBarField) => ({
    orderBy: field.id,
    page: 1,
  }),
  stateSorting: (prevState: OwnState) => (direction: SortDirection) => ({
    direction,
    page: 1,
  }),
  stateSizing: (prevState: OwnState) => (size: number) => ({
    size,
    page: 1,
  }),
};

const handlerCreators: HandleCreators<ProjectAssignmentListProps, OwnHandlers> = {
  handleGoToDetail: (props: ProjectAssignmentListProps) => (assignmentUid) => {
    const { history } = props;
    const { isLoading } = props.projectAssignmentState.all;

    if (!isLoading) {
      history.push(`/project/assignment/details/${assignmentUid}`);
    } 
  },
  handleGoToNext: (props: ProjectAssignmentListProps) => () => { 
    props.stateNext();
  },
  handleGoToPrevious: (props: ProjectAssignmentListProps) => () => { 
    props.statePrevious();
  },
  handleReloading: (props: ProjectAssignmentListProps) => () => { 
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  handleChangeOrder: (props: ProjectAssignmentListProps) => (field: IListBarField) => { 
    props.stateOrdering(field);
  },
  handleChangeSize: (props: ProjectAssignmentListProps) => (value: number) => { 
    props.stateSizing(value);
  },
  handleChangeSort: (props: ProjectAssignmentListProps) => (direction: SortDirection) => { 
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectAssignmentListProps, OwnState> = {
  componentDidMount() { 
    const { 
      handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl 
    } = this.props;
    
    const { isLoading, response } = this.props.projectAssignmentState.all;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectAssignmentRequest,
      parentUid: AppMenu.ProjectRegistration,
      title: intl.formatMessage(projectMessage.assignment.page.listTitle),
      subTitle : intl.formatMessage(projectMessage.assignment.page.listSubHeader)
    });

    layoutDispatch.modeListOn();
    layoutDispatch.searchShow();
    layoutDispatch.actionCentreShow();

    navBottomDispatch.assignCallbacks({
      onNextCallback: handleGoToNext,
      onPrevCallback: handleGoToPrevious,
      onSyncCallback: handleReloading,
      onOrderCallback: handleChangeOrder,
      onDirectionCallback: handleChangeSort,
      onAddCallback: () => history.push('/project/assignment/form'),
      onSizeCallback: handleChangeSize,
    });

    const items = Object.keys(ProjectRegistrationField)
      .map(key => ({ id: key, name: ProjectRegistrationField[key] }));

    navBottomDispatch.assignFields(items);

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: ProjectAssignmentListProps, state: OwnState) {
    // only load when these props are different
    if (
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size
    ) {
      loadData(this.props);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, navBottomDispatch } = this.props;
    const { view } = this.props.layoutState;
    const { loadAllDispose } = this.props.projectAssignmentDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();

    // dispose 'get all' from 'redux store' when the page is 'out of project registration' context 
    if (view && view.parentUid !== AppMenu.ProjectRegistration) {
      loadAllDispose();
    }
  }
};

const loadData = (props: ProjectAssignmentListProps): void => {
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.projectAssignmentDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      filter: {
        direction,
        orderBy,
        page,
        size,
        customerUids: undefined,
        projectTypes: undefined,
        statusTypes: undefined,
        projectUid: undefined,
        find: undefined,
        findBy: undefined,
      }
    }); 
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const ProjectAssignmentList = compose<ProjectAssignmentListProps, OwnOptions>(
  withProjectAssignment,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<ProjectAssignmentListProps, OwnHandlers>(handlerCreators),
  lifecycle<ProjectAssignmentListProps, OwnState>(lifecycles),
)(ProjectAssignmentListView);