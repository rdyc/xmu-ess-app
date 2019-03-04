import AppMenu from '@constants/AppMenu';
import { DirectionType } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithLeaveCalculation, withLeaveCalculation } from '@lookup/hoc/withLeaveCalculation';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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

import { LeaveCalculationListView } from './LeaveCalculationListView';

interface OwnHandlers {
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleChangeSize: (value: number) => void;
  handleChangeSort: (direction: boolean) => void;
  handleChangePage: (page: number) => void;
  handleDialog: () => void;
  handleChangeFilter: (companyUid: string, year: string) => void;
}

interface OwnOptions {
  orderBy?: string | undefined;
  direction?: string | undefined;
  page?: number | undefined;
  size?: number | undefined;
  find?: string | undefined;
  findBy?: string | undefined;
  open?: boolean;
  type?: string | undefined;
}

interface OwnState {
  companyUid: string;
  year: number;
  orderBy: string | undefined;
  direction?: DirectionType;
  page: number;
  size: number;
  find: string | undefined;
  findBy: string | undefined;
  open: boolean;
  type: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateNext: StateHandler<OwnState>;
  statePrevious: StateHandler<OwnState>;
  stateSorting: StateHandler<OwnState>;
  stateSizing: StateHandler<OwnState>;
  statePage: StateHandler<OwnState>;
  stateDialog: StateHandler<OwnState>;
  stateUpdate: StateHandler<OwnState>;
}

export type FilterProgressData = {
  companyUid: string | null;
  year: string | null;
};

export type LeaveCalculationListProps = WithLeaveCalculation &
  WithUser &
  WithLayout &
  WithMasterPage &
  RouteComponentProps &
  InjectedIntlProps &
  OwnOptions &
  OwnHandlers &
  OwnState &
  OwnStateUpdaters;

const createProps: mapper<LeaveCalculationListProps, OwnState> = (props: LeaveCalculationListProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.leaveCalculationState.all;

  return {
    companyUid: '',
    year: 0,
    find: undefined,
    findBy: undefined,
    open: false,
    type: undefined,
    orderBy:
      (request && request.filter && request.filter.orderBy) || orderBy || 'fullName',
    direction:
      (request && request.filter && request.filter.direction) ||
      direction ||
      'ascending',
    page: (request && request.filter && request.filter.page) || page || 1,
    size: (request && request.filter && request.filter.size) || size || 10
  };
};

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  stateNext: (prevState: OwnState) => () => ({
    page: prevState.page + 1
  }),
  statePrevious: (prevState: OwnState) => () => ({
    page: prevState.page - 1
  }),
  stateSorting: (prevState: OwnState) => (direction: DirectionType) => ({
    direction,
    page: 1
  }),
  stateSizing: (prevState: OwnState) => (size: number) => ({
    size,
    page: 1
  }),
  statePage: (prevState: OwnState) => (page: number) => ({
    page
  }),
  stateDialog: (prevState: OwnState) => (open: boolean) => ({
    open
  }),
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
};

const handlerCreators: HandleCreators<LeaveCalculationListProps, OwnHandlers> = {
  handleGoToNext: (props: LeaveCalculationListProps) => () => {
    props.stateNext();
  },
  handleGoToPrevious: (props: LeaveCalculationListProps) => () => {
    props.statePrevious();
  },
  handleChangeSize: (props: LeaveCalculationListProps) => (value: number) => {
    props.stateSizing(value);
  },
  handleChangeSort: (props: LeaveCalculationListProps) => (
    direction: boolean
  ) => {
    props.stateSorting(direction ? 'descending' : 'ascending');
  },
  handleChangePage: (props: LeaveCalculationListProps) => (page: number) => {
    props.statePage(page);
  },
  handleDialog: (props: LeaveCalculationListProps) => () => {
    let { open } = props;

    open = !open;
    props.stateDialog(open);
  },
  handleChangeFilter: (props: LeaveCalculationListProps) => (companyUid: string, year: string) => {
    const { stateUpdate } = props;

    stateUpdate({
      companyUid,
      year
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<LeaveCalculationListProps, OwnState> = {
  componentDidMount() {
    const {
      intl, companyUid, year
    } = this.props;

    const { isLoading, response } = this.props.leaveCalculationState.all;

    this.props.masterPage.changePage({
      uid: AppMenu.LookupEmployeeLeave,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage(lookupMessage.calculation.page.title),
      description: intl.formatMessage(lookupMessage.calculation.page.subHeader)
    });

    // only load data when response are empty
    if (!isLoading && !response) {
      if (companyUid !== '' && year !== 0) {
        loadData(this.props);
      }
    }
  },
  componentDidUpdate(props: LeaveCalculationListProps, state: OwnState) {
    // only load when these props are different
    if (
      this.props.companyUid !== props.companyUid ||
      this.props.year !== props.year ||
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size ||
      this.props.find !== props.find
    ) {
      const { loadAllDispose } = this.props.leaveCalculationDispatch;

      loadAllDispose();
      loadData(this.props);
    }
  },
  componentWillUnmount() {
    const { masterPage } = this.props;
    const { loadAllDispose } = this.props.leaveCalculationDispatch;

    masterPage.resetPage();
    loadAllDispose();
  }
};

const loadData = (props: LeaveCalculationListProps): void => {
  const { orderBy, direction, size, find, findBy, page } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.leaveCalculationDispatch;
  const { alertAdd } = props.layoutDispatch;
  const { companyUid, year } = props;

  if (user) {
    loadAllRequest({
      companyUid,
      year,
      filter: {
        direction,
        orderBy,
        page,
        size,
        find,
        findBy
      }
    });
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const LeaveCalculationList = compose<LeaveCalculationListProps, OwnOptions>(
  withLeaveCalculation,
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(
    createProps,
    stateUpdaters
  ),
  withHandlers<LeaveCalculationListProps, OwnHandlers>(handlerCreators),
  lifecycle<LeaveCalculationListProps, OwnState>(lifecycles)
)(LeaveCalculationListView);
