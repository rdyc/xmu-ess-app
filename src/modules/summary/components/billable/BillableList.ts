import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { BillableListView } from '@summary/components/billable/BillableListView';
import { WithSummaryRequest, withSummaryRequest } from '@summary/hoc/withSummary';
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
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleReloading: () => void;
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

export type BillableListProps 
  = WithSummaryRequest
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<BillableListProps, OwnState> = (props: BillableListProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.summaryState.billable;

  return { 
    orderBy: request && request.filter && request.filter.orderBy || orderBy || 'uid',
    direction: request && request.filter && request.filter.direction || direction || 'descending',
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

const handlerCreators: HandleCreators<BillableListProps, OwnHandlers> = {
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
  handleChangeOrder: (props: BillableListProps) => (field: ICollectionValue) => { 
    props.stateOrdering(field);
  },
  handleChangeSize: (props: BillableListProps) => (value: number) => { 
    props.stateSizing(value);
  },
  handleChangeSort: (props: BillableListProps) => (direction: SortDirection) => { 
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<BillableListProps, OwnState> = {
  componentDidMount() { 
    const { 
      handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl 
    } = this.props;
    
    const { isLoading, response } = this.props.summaryState.billable;

    layoutDispatch.changeView({
      uid: AppMenu.ReportBillable,
      parentUid: AppMenu.Report,
      title: intl.formatMessage({id: 'report.billable.title'}),
      subTitle : intl.formatMessage({id: 'report.billable.subTitle'})
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
      onSizeCallback: handleChangeSize,
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
  const { orderBy, direction, page, size } = props;
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
        start: undefined,
        end: undefined,
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

export const BillableList = compose<BillableListProps, OwnOptions>(
  withSummaryRequest,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<BillableListProps, OwnHandlers>(handlerCreators),
  lifecycle<BillableListProps, OwnState>(lifecycles),
)(BillableListView);