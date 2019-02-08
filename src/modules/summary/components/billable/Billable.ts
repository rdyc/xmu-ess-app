import AppMenu from '@constants/AppMenu';
import { DirectionType } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
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
  withStateHandlers,
} from 'recompose';

import { IBillableListFilterResult } from './BillableListFilter';
import { BillableView } from './BillableView';

interface OwnState extends IBillableListFilterResult {
  isAdmin: boolean;
  reloadData: boolean;
  uid: string | undefined;
  isDetailOpen: boolean;
  type: string | undefined;
  orderBy?: string | undefined;
  direction?: DirectionType;
  page: number;
  size: number;
}

interface OwnHandlers {
  handleDialogDetail: () => void;
  handleGoToNext: () => void;
  handleReloadData: () => void;
  handleGoToPrevious: () => void;
  handleChangePage: (page: number) => void;
  handleChangeSize: (size: number) => void;
  handleChangeSort: (direction: boolean) => void;
  handleDetail: (uid: string, type: string) => void;
  handleChangeFilter: (filter: IBillableListFilterResult) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
  setFilterApplied: StateHandler<OwnState>;
}

export type BillableProps = WithSummary &
  WithWidth &
  WithUser &
  WithLayout &
  RouteComponentProps &
  InjectedIntlProps &
  OwnState &
  OwnHandlers &
  OwnStateUpdaters &
  WithStyles<typeof styles>;

const createProps: mapper<BillableProps, OwnState> = (
  props: BillableProps
): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.summaryState.billable;

  return {
    isAdmin: false,
    reloadData: false,
    isDetailOpen: false,
    type: undefined,
    uid: undefined,
    start: moment()
      .startOf('year')
      .toISOString(true),
    end: moment().toISOString(true),
    orderBy:
      (request && request.filter && request.filter.orderBy) ||
      orderBy ||
      'fullName',
    direction:
      (request && request.filter && request.filter.direction) ||
      direction ||
      'ascending',
    page: (request && request.filter && request.filter.page) || page || 1,
    size: (request && request.filter && request.filter.size) || size || 10
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setFilterApplied: (prevState: OwnState) => (filter: IBillableListFilterResult) => ({
    ...filter,
    page: 1
  })
};

const handlerCreators: HandleCreators<BillableProps, OwnHandlers> = {
  handleChangeFilter: (props: BillableProps) => (filter: IBillableListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleReloadData: (props: BillableProps) => () => {
    props.stateUpdate({
      reloadData: true
    });
  },
  handleDialogDetail: (props: BillableProps) => () => {
    props.stateUpdate({
      isDetailOpen: !props.isDetailOpen
    });
  },
  handleDetail: (props: BillableProps) => (uid: string, type: string) => {
    props.stateUpdate({
      uid,
      type
    });
  },
  handleGoToNext: (props: BillableProps) => () => {
    props.stateUpdate({
      page: props.page + 1
    });
  },
  handleGoToPrevious: (props: BillableProps) => () => {
    props.stateUpdate({
      page: props.page - 1
    });
  },
  handleChangeSize: (props: BillableProps) => (size: number) => {
    props.stateUpdate({
      size,
      page: 1
    });
  },
  handleChangePage: (props: BillableProps) => (page: number) => {
    props.stateUpdate({
      page
    });
  },
  handleChangeSort: (props: BillableProps) => (direction: boolean) => {
    props.stateUpdate({
      direction: direction ? 'descending' : 'ascending'
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<BillableProps, OwnState> = {
  componentDidMount() {
    const { layoutDispatch, intl } = this.props;

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
  componentWillUpdate(props: BillableProps, state: OwnState) {
    if (
      this.props.companyUid !== props.companyUid ||
      this.props.employeeUid !== props.employeeUid ||
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size ||
      this.props.start !== props.start ||
      this.props.end !== props.end
    ) {
      loadData(props);
    }
    if (props.reloadData) {
      loadData(props);

      props.stateUpdate({
        reloadData: false
      });
    }
  },
  componentWillUnmount() {
    const { layoutDispatch } = this.props;
    const { view } = this.props.layoutState;
    const { loadBillableDispose } = this.props.summaryDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.modeSearchOff();
    layoutDispatch.moreHide();

    // dispose 'get all' from 'redux store' when the page is 'out of project registration' context
    if (view && view.uid !== AppMenu.ReportBillable) {
      loadBillableDispose();
    }
  }
};

const loadData = (props: BillableProps): void => {
  const { orderBy, direction, size, page, isAdmin } = props;
  const { user } = props.userState;
  const { loadBillableRequest } = props.summaryDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadBillableRequest({
      companyUid: isAdmin ? props.companyUid : user.company.uid,
      filter: {
        direction,
        orderBy,
        page,
        size,
        companyUid: isAdmin ? props.companyUid : user.company.uid,
        employeeUid: props.employeeUid,
        start: props.start,
        end: props.end
      }
    });
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const Billable = compose<BillableProps, {}>(
  withSummary,
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withWidth(),
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<BillableProps, OwnHandlers>(handlerCreators),
  lifecycle<BillableProps, OwnState>(lifecycles)
)(BillableView);
