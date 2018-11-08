import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { BillableListView } from '@summary/components/billable/BillableListView';
import {
  WithSummaryRequest,
  withSummaryRequest
} from '@summary/hoc/withSummary';
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
  handleChangeStart: (start: string) => void;
  handleChangeEnd: (end: string) => void;
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
  _start: string;
  _end: string;
  orderBy: string | undefined;
  direction: string | undefined;
  page: number;
  size: number;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateStart: StateHandler<OwnState>;
  stateEnd: StateHandler<OwnState>;
  stateNext: StateHandler<OwnState>;
  statePrevious: StateHandler<OwnState>;
  stateReloading: StateHandler<OwnState>;
  stateOrdering: StateHandler<OwnState>;
  stateSorting: StateHandler<OwnState>;
  stateSizing: StateHandler<OwnState>;
}

export type BillableListProps = WithSummaryRequest &
  WithUser &
  WithLayout &
  WithNavBottom &
  RouteComponentProps &
  InjectedIntlProps &
  OwnOptions &
  OwnHandlers &
  OwnState &
  OwnStateUpdaters;

const createProps: mapper<BillableListProps, OwnState> = (
  props: BillableListProps
): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.summaryState.billable;

  return {
    _start: moment()
      .startOf('year')
      .toISOString(true),
    _end: moment().toISOString(true),
    orderBy:
      (request && request.filter && request.filter.orderBy) || orderBy || 'uid',
    direction:
      (request && request.filter && request.filter.direction) ||
      direction ||
      'descending',
    page: (request && request.filter && request.filter.page) || page || 1,
    size: (request && request.filter && request.filter.size) || size || 10
  };
};

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  stateStart: (prevState: OwnState) => (_start: string) => ({
    _start
  }),
  stateEnd: (prevState: OwnState) => (_end: string) => ({
    _end
  }),
  stateNext: (prevState: OwnState) => () => ({
    page: prevState.page + 1
  }),
  statePrevious: (prevState: OwnState) => () => ({
    page: prevState.page - 1
  }),
  stateReloading: (prevState: OwnState) => () => ({
    page: 1
  }),
  stateOrdering: (prevState: OwnState) => (field: IListBarField) => ({
    orderBy: field.id,
    page: 1
  }),
  stateSorting: (prevState: OwnState) => (direction: SortDirection) => ({
    direction,
    page: 1
  }),
  stateSizing: (prevState: OwnState) => (size: number) => ({
    size,
    page: 1
  })
};

const handlerCreators: HandleCreators<BillableListProps, OwnHandlers> = {
  handleChangeStart: (props: BillableListProps) => (start: string) => {
    const { stateStart } = props;
    let { _start } = props;

    _start = start;
    stateStart(_start);
  },
  handleChangeEnd: (props: BillableListProps) => (end: string) => {
    const { stateEnd } = props;
    let { _end } = props;

    _end = end;
    stateEnd(_end);
  },
  handleGoToNext: (props: BillableListProps) => () => {
    props.stateNext();
  },
  handleGoToPrevious: (props: BillableListProps) => () => {
    props.statePrevious();
  },
  handleReloading: (props: BillableListProps) => () => {
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  handleChangeOrder: (props: BillableListProps) => (field: IListBarField) => {
    props.stateOrdering(field);
  },
  handleChangeSize: (props: BillableListProps) => (value: number) => {
    props.stateSizing(value);
  },
  handleChangeSort: (props: BillableListProps) => (
    direction: SortDirection
  ) => {
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<BillableListProps, OwnState> = {
  componentDidMount() {
    const {
      handleGoToNext,
      handleGoToPrevious,
      handleReloading,
      handleChangeOrder,
      handleChangeSize,
      handleChangeSort,
      layoutDispatch,
      navBottomDispatch,
      history,
      intl
    } = this.props;

    const { isLoading, response } = this.props.summaryState.billable;

    layoutDispatch.changeView({
      uid: AppMenu.ReportBillable,
      parentUid: AppMenu.Report,
      title: intl.formatMessage({ id: 'billable.title' }),
      subTitle: intl.formatMessage({ id: 'billable.subTitle' })
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
      onAddCallback: () => history.push('/'),
      onSizeCallback: handleChangeSize
    });

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentWillReceiveProps(nextProps: BillableListProps) {
    if (
      nextProps._start !== this.props._start ||
      nextProps._end !== this.props._end
    ) {
      const { loadBillableDispose } = this.props.summaryDispatch;

      loadBillableDispose();
      loadData(nextProps);
    }
  },
  componentDidUpdate(props: BillableListProps, state: OwnState) {
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
    const { loadBillableDispose } = this.props.summaryDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();

    // dispose 'get all' from 'redux store' when the page is 'out of report billable' context
    if (view && view.parentUid !== AppMenu.Report) {
      loadBillableDispose();
    }
  }
};

const loadData = (props: BillableListProps): void => {
  const { orderBy, direction, page, size, _start, _end } = props;
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
        start: _start,
        end: _end,
        find: undefined,
        findBy: undefined
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
  withSummaryRequest,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(
    createProps,
    stateUpdaters
  ),
  withHandlers<BillableListProps, OwnHandlers>(handlerCreators),
  lifecycle<BillableListProps, OwnState>(lifecycles)
)(BillableListView);
