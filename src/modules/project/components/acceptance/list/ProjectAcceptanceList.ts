import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ProjectAssignmentField } from '@project/classes/types';
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
  loadData: () => void;
  handleReloading: () => void;
  handleGoToDetail: (assignmentUid: string) => void;
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleChangeSize: (value: number) => void;
  handleChangeOrder: (field: ICollectionValue) => void;
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
  stateOrdering: (prevState: OwnState) => (field: ICollectionValue) => ({
    orderBy: field.value,
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
  loadData: (props: ProjectAcceptanceListProps) => () => { 
    const { orderBy, direction, page, size } = props;
    const { loadAllRequest } = props.projectAcceptanceDispatch;
    const { isLoading } = props.projectAcceptanceState.all;

    if (!isLoading) {
      loadAllRequest({
        filter: {
          query: {
            direction,
            orderBy,
            page,
            size,
            find: undefined,
            findBy: undefined
          },
          // status: 'pending'
        }
      }); 
    }
  },
  handleReloading: (props: ProjectAcceptanceListProps) => () => { 
    props.stateReloading();
  },
  handleGoToDetail: (props: ProjectAcceptanceListProps) => (assignmentUid: string) => {
    const { history } = props;
    const { isLoading } = props.projectAcceptanceState.all;

    if (!isLoading) {
      history.push(`/project/acceptances/${assignmentUid}`);
    } 
  },
  handleGoToNext: (props: ProjectAcceptanceListProps) => () => { 
    props.stateNext();
  },
  handleGoToPrevious: (props: ProjectAcceptanceListProps) => () => { 
    props.statePrevious();
  },
  handleChangeOrder: (props: ProjectAcceptanceListProps) => (field: ICollectionValue) => { 
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
      loadData, handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl
    } = this.props;
    
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

    const items = Object.keys(ProjectAssignmentField)
      .map(key => ({ value: key, name: ProjectAssignmentField[key] }));

    navBottomDispatch.assignFields(items);

    loadData();
  },
  componentDidUpdate(props: ProjectAcceptanceListProps, state: OwnState) {
    // only load when these props are different
    if (
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size
    ) {
      this.props.loadData();
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
    if (view && view.parentUid !== AppMenu.ProjectAssignment) {
      loadAllDispose();
    }
  }
};

export const ProjectAcceptanceList = compose<ProjectAcceptanceListProps, OwnOptions>(
  withProjectAcceptance,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(ProjectAcceptanceListView);