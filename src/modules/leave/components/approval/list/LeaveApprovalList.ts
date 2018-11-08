import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { LeaveRequestField } from '@leave/classes/types';
import { LeaveApprovalListView } from '@leave/components/approval/list/LeaveApprovalListView';
import { WithLeaveApproval, withLeaveApproval } from '@leave/hoc/withLeaveApproval';
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
  handleGoToDetail: (leaveUid: string) => void;
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

export type LeaveApprovalListProps 
  = WithLeaveApproval
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<LeaveApprovalListProps, OwnState> = (props: LeaveApprovalListProps): OwnState => {
  const { page, size } = props;
  const { request } = props.leaveApprovalState.all;

  return { 
    orderBy: request && request.filter && request.filter.query && request.filter.query.orderBy || 'uid',
    direction: request && request.filter && request.filter.query && request.filter.query.direction || 'descending',
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

const handlerCreators: HandleCreators<LeaveApprovalListProps, OwnHandlers> = {
  handleGoToDetail: (props: LeaveApprovalListProps) => (leaveUid) => {
    const { history } = props;
    const { isLoading } = props.leaveApprovalState.all;

    if (!isLoading) {
      history.push(`/leave/approvals/${leaveUid}`);
    } 
  },
  handleGoToNext: (props: LeaveApprovalListProps) => () => { 
    props.stateNext();
  },
  handleGoToPrevious: (props: LeaveApprovalListProps) => () => { 
    props.statePrevious();
  },
  handleReloading: (props: LeaveApprovalListProps) => () => { 
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  handleChangeOrder: (props: LeaveApprovalListProps) => (field: IListBarField) => { 
    props.stateOrdering(field);
  },
  handleChangeSize: (props: LeaveApprovalListProps) => (value: number) => { 
    props.stateSizing(value);
  },
  handleChangeSort: (props: LeaveApprovalListProps) => (direction: SortDirection) => { 
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<LeaveApprovalListProps, OwnState> = {
  componentDidMount() { 
    const { 
      handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl 
    } = this.props;
    
    const { isLoading, response } = this.props.leaveApprovalState.all;

    layoutDispatch.changeView({
      uid: AppMenu.LeaveApproval,
      parentUid: AppMenu.LeaveApproval,
      title: intl.formatMessage({id: 'leave.title'}),
      subTitle : intl.formatMessage({id: 'leave.subTitle'})
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
      onAddCallback: () => history.push('/leave/approvals/form'),
      onSizeCallback: handleChangeSize,
    });

    const items = Object.keys(LeaveRequestField)
      .map(key => ({ id: key, name: LeaveRequestField[key] }));

    navBottomDispatch.assignFields(items);

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: LeaveApprovalListProps, state: OwnState) {
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
    const { loadAllDispose } = this.props.leaveApprovalDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();

    // dispose 'get all' from 'redux store' when the page is 'out of leave request' context 
    if (view && view.parentUid !== AppMenu.LeaveApproval) {
      loadAllDispose();
    }
  }
};

const loadData = (props: LeaveApprovalListProps): void => {
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.leaveApprovalDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      filter: {
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        query: {
          direction,
          orderBy,
          page,
          size,
          find: undefined,
          findBy: undefined
        },
        isNotify: undefined,
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

export const LeaveApprovalList = compose<LeaveApprovalListProps, OwnOptions>(
  withLeaveApproval,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<LeaveApprovalListProps, OwnHandlers>(handlerCreators),
  lifecycle<LeaveApprovalListProps, OwnState>(lifecycles),
)(LeaveApprovalListView);