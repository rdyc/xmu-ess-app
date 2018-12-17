import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { BillableListView } from '@summary/components/billable/BillableListView';
import { WithSummary, withSummary } from '@summary/hoc/withSummary';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as moment from 'moment';
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

interface OwnHandlers {
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleChangeSize: (value: number) => void;
  handleChangeSort: (direction: boolean) => void;
  handleChangePage: (page: number) => void;
  handleDetail: (uid: string, type: string) => void;
  handleDialog: () => void;
  handleChangeFilter: (employeeUid: string | undefined, start: string, end: string) => void;
}

interface OwnOptions {
  orderBy?: string | undefined;
  direction?: string | undefined;
  page?: number | undefined;
  size?: number | undefined;
  find?: string | undefined;
  findBy?: string | undefined;
  uid?: string | undefined;
  open?: boolean;
  type?: string | undefined;
}

interface OwnState {
  start: string;
  end: string;
  orderBy: string | undefined;
  direction: string | undefined;
  page: number;
  size: number;
  find: string | undefined;
  findBy: string | undefined;
  uid: string | undefined;
  open: boolean;
  type: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateNext: StateHandler<OwnState>;
  statePrevious: StateHandler<OwnState>;
  stateSorting: StateHandler<OwnState>;
  stateSizing: StateHandler<OwnState>;
  statePage: StateHandler<OwnState>;
  stateDetail: StateHandler<OwnState>;
  stateDialog: StateHandler<OwnState>;
  stateUpdate: StateHandler<OwnState>;
}

export type BillableListProps = WithSummary &
  WithUser &
  WithLayout &
  RouteComponentProps &
  InjectedIntlProps &
  OwnOptions &
  OwnHandlers &
  OwnState &
  OwnStateUpdaters;

const createProps: mapper<BillableListProps, OwnState> = (props: BillableListProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.summaryState.billable;

  return {
    start: moment()
      .startOf('year')
      .toISOString(true),
    end: moment().toISOString(true),
    find: undefined,
    findBy: undefined,
    uid: undefined,
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
  stateDetail: (prevState: OwnState) => (uid: string, type: string) => ({
    uid,
    type
  }),
  stateDialog: (prevState: OwnState) => (open: boolean) => ({
    open
  }),
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
};

const handlerCreators: HandleCreators<BillableListProps, OwnHandlers> = {
  handleGoToNext: (props: BillableListProps) => () => {
    props.stateNext();
  },
  handleGoToPrevious: (props: BillableListProps) => () => {
    props.statePrevious();
  },
  handleChangeSize: (props: BillableListProps) => (value: number) => {
    props.stateSizing(value);
  },
  handleChangeSort: (props: BillableListProps) => (
    direction: boolean
  ) => {
    props.stateSorting(direction ? 'descending' : 'ascending');
  },
  handleChangePage: (props: BillableListProps) => (page: number) => {
    props.statePage(page);
  },
  handleDetail: (props: BillableListProps) => (uid: string, type: string) => {
    props.stateDetail(uid, type);
  },
  handleDialog: (props: BillableListProps) => () => {
    let { open } = props;

    open = !open;
    props.stateDialog(open);
  },
  handleChangeFilter: (props: BillableListProps) => (employeeUid: string | undefined, start: string, end: string) => {
    const { stateUpdate } = props;

    stateUpdate({
      start,
      end,
      find: employeeUid,
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<BillableListProps, OwnState> = {
  componentDidMount() {
    const {
      layoutDispatch,
      intl
    } = this.props;

    const { isLoading, response } = this.props.summaryState.billable;

    layoutDispatch.changeView({
      uid: AppMenu.ReportBillable,
      parentUid: AppMenu.Report,
      title: intl.formatMessage(summaryMessage.billable.page.title),
      subTitle: intl.formatMessage(summaryMessage.billable.page.subHeader)
    });

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: BillableListProps, state: OwnState) {
    // only load when these props are different
    if (
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size ||
      this.props.start !== props.start ||
      this.props.end !== props.end ||
      this.props.find !== props.find
    ) {
      const { loadBillableDispose } = this.props.summaryDispatch;

      loadBillableDispose();
      loadData(this.props);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch } = this.props;
    const { view } = this.props.layoutState;
    const { loadBillableDispose } = this.props.summaryDispatch;

    layoutDispatch.changeView(null);

    // dispose 'get all' from 'redux store' when the page is 'out of report billable' context
    if (view && view.parentUid !== AppMenu.Report) {
      loadBillableDispose();
    }
  }
};

const loadData = (props: BillableListProps): void => {
  const { orderBy, direction, size, start, end, find, findBy, page } = props;
  const { user } = props.userState;
  const { loadBillableRequest } = props.summaryDispatch;
  const { alertAdd } = props.layoutDispatch;
    
  if (user) {
    loadBillableRequest({
      companyUid: user.company.uid,
      filter: {
        direction,
        orderBy,
        page,
        size,
        start,
        end,
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

export const BillableList = compose<BillableListProps, OwnOptions>(
  withSummary,
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(
    createProps,
    stateUpdaters
  ),
  withHandlers<BillableListProps, OwnHandlers>(handlerCreators),
  lifecycle<BillableListProps, OwnState>(lifecycles)
)(BillableListView);
