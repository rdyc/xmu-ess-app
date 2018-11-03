import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { ProjectRegistrationField } from '@project/classes/types';
import { WithProjectAcceptance, withProjectAcceptance } from '@project/hoc/withProjectAcceptance';
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

import { ProjectAcceptanceListView } from './ProjectAcceptanceListView';

interface OwnHandlers {
  handleGoToDetail: (assignmentUid: string, assignmentItemUid: string) => void;
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

export type ProjectAcceptanceListProps 
  = WithProjectAcceptance
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<ProjectAcceptanceListProps, OwnState> = (props: ProjectAcceptanceListProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.projectAcceptanceState.all;

  return { 
    orderBy: request && request.filter && request.filter.query && request.filter.query.orderBy || orderBy || 'uid',
    direction: request && request.filter && request.filter.query && request.filter.query.direction || direction || 'descending',
    page: request && request.filter && request.filter.query && request.filter.query.page || page || 1, 
    size: request && request.filter && request.filter.query && request.filter.query.size || size || 10,
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

const handlerCreators: HandleCreators<ProjectAcceptanceListProps, OwnHandlers> = {
  handleGoToDetail: (props: ProjectAcceptanceListProps) => (assignmentUid: string, assignmentItemUid: string) => {
    const { history } = props;
    const { isLoading } = props.projectAcceptanceState.all;

    if (!isLoading) {
      history.push(`/project/acceptances/${assignmentUid}/${assignmentItemUid}`);
    } 
  },
  handleGoToNext: (props: ProjectAcceptanceListProps) => () => { 
    props.stateNext();
  },
  handleGoToPrevious: (props: ProjectAcceptanceListProps) => () => { 
    props.statePrevious();
  },
  handleReloading: (props: ProjectAcceptanceListProps) => () => { 
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  handleChangeOrder: (props: ProjectAcceptanceListProps) => (field: IListBarField) => { 
    props.stateOrdering(field);
  },
  handleChangeSize: (props: ProjectAcceptanceListProps) => (value: number) => { 
    props.stateSizing(value);
  },
  handleChangeSort: (props: ProjectAcceptanceListProps) => (direction: SortDirection) => { 
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectAcceptanceListProps, OwnState> = {
  componentDidMount() { 
    const { 
      handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl 
    } = this.props;
    
    const { isLoading, response } = this.props.projectAcceptanceState.all;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectAssignmentAcceptance,
      parentUid: AppMenu.ProjectAssignment,
      title: intl.formatMessage(projectMessage.acceptance.page.listTitle),
      subTitle : intl.formatMessage(projectMessage.acceptance.page.listSubHeader)
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
      onAddCallback: () => history.push('/project/form'),
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
  componentDidUpdate(props: ProjectAcceptanceListProps, state: OwnState) {
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
    const { loadAllDispose } = this.props.projectAcceptanceDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();

    // dispose 'get all' from 'redux store' when the page is 'out of project acceptance' context 
    if (view && view.parentUid !== AppMenu.ProjectAssignmentAcceptance) {
      loadAllDispose();
    }
  }
};

const loadData = (props: ProjectAcceptanceListProps): void => {
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.projectAcceptanceDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      filter: {
        // companyUid: user.company.uid,
        // positionUid: user.position.uid,
        query: {
          direction,
          orderBy,
          page,
          size,
          find: undefined,
          findBy: undefined
        },
        // isNotify: undefined,
        status: 'pending'
      }
    }); 
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const ProjectAcceptanceList = compose<ProjectAcceptanceListProps, OwnOptions>(
  withProjectAcceptance,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<ProjectAcceptanceListProps, OwnHandlers>(handlerCreators),
  lifecycle<ProjectAcceptanceListProps, OwnState>(lifecycles),
)(ProjectAcceptanceListView);