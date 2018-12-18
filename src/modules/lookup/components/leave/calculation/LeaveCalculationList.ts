import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
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
  withStateHandlers
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
  direction: string | undefined;
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
  stateSorting: (prevState: OwnState) => (direction: string) => ({
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
      layoutDispatch,
      intl, companyUid, year
    } = this.props;

    const { isLoading, response } = this.props.leaveCalculationState.all;

    layoutDispatch.changeView({
      uid: AppMenu.LookupLeave,
      parentUid: AppMenu.Leave,
      title: intl.formatMessage(lookupMessage.calculation.page.title),
      subTitle: intl.formatMessage(lookupMessage.calculation.page.subHeader)
    });

      // only load data when response are empty
    if (!isLoading && !response) {
        if (companyUid !== '' && year !== 0) {
          loadData(this.props);
        }
    }
  },
  componentWillUpdate(props: LeaveCalculationListProps, state: OwnState) {
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
      loadData(props);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch } = this.props;
    const { view } = this.props.layoutState;
    const { loadAllDispose } = this.props.leaveCalculationDispatch;

    layoutDispatch.changeView(null);

    // dispose 'get all' from 'redux store' when the page is 'out of leave calculation' context
    if (view && view.parentUid !== AppMenu.Leave) {
      loadAllDispose();
    }
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
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(
    createProps,
    stateUpdaters
  ),
  withHandlers<LeaveCalculationListProps, OwnHandlers>(handlerCreators),
  lifecycle<LeaveCalculationListProps, OwnState>(lifecycles)
)(LeaveCalculationListView);
