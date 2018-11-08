import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { PurchaseField } from '@purchase/classes/types';
import { PurchaseRequestListView } from '@purchase/components/purchaseRequest/list/PurchaseRequestListView';
import { WithPurchaseRequest, withPurchaseRequest } from '@purchase/hoc/purchaseRequest/withPurchaseRequest';
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
  handleGoToDetail: (purchaseUid: string) => void;
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

export type PurchaseRequestListProps 
  = WithPurchaseRequest
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<PurchaseRequestListProps, OwnState> = (props: PurchaseRequestListProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.purchaseRequestState.all;

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

const handlerCreators: HandleCreators<PurchaseRequestListProps, OwnHandlers> = {
  handleGoToDetail: (props: PurchaseRequestListProps) => (purchaseUid) => {
    const { history } = props;
    const { isLoading } = props.purchaseRequestState.all;

    if (!isLoading) {
      history.push(`/purchase/requests/details/${purchaseUid}`);
    } 
  },
  handleGoToNext: (props: PurchaseRequestListProps) => () => { 
    props.stateNext();
  },
  handleGoToPrevious: (props: PurchaseRequestListProps) => () => { 
    props.statePrevious();
  },
  handleReloading: (props: PurchaseRequestListProps) => () => { 
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  handleChangeOrder: (props: PurchaseRequestListProps) => (field: IListBarField) => { 
    props.stateOrdering(field);
  },
  handleChangeSize: (props: PurchaseRequestListProps) => (value: number) => { 
    props.stateSizing(value);
  },
  handleChangeSort: (props: PurchaseRequestListProps) => (direction: SortDirection) => { 
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<PurchaseRequestListProps, OwnState> = {
  componentDidMount() { 
    const { 
      handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl 
    } = this.props;
    
    const { isLoading, response } = this.props.purchaseRequestState.all;

    layoutDispatch.changeView({
      uid: AppMenu.PurchaseRequest,
      parentUid: AppMenu.Purchase,
      title: intl.formatMessage({id: 'purchase.title'}),
      subTitle : intl.formatMessage({id: 'purchase.subTitle'})
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
      onAddCallback: () => history.push('/purchase/request/form'),
      onSizeCallback: handleChangeSize,
    });

    const items = Object.keys(PurchaseField)
      .map(key => ({ id: key, name: PurchaseField[key] }));

    navBottomDispatch.assignFields(items);

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: PurchaseRequestListProps, state: OwnState) {
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
    const { loadAllDispose } = this.props.purchaseRequestDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();

    // dispose 'get all' from 'redux store' when the page is 'out of purchase request' context 
    if (view && view.parentUid !== AppMenu.Purchase) {
      loadAllDispose();
    }
  }
};

const loadData = (props: PurchaseRequestListProps): void => {
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.purchaseRequestDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      filter: {
        direction,
        orderBy,
        page,
        size,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        customerUid: undefined,
        isRejected: undefined,
        isSettlement: undefined,
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

export const PurchaseRequestList = compose<PurchaseRequestListProps, OwnOptions>(
  withPurchaseRequest,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<PurchaseRequestListProps, OwnHandlers>(handlerCreators),
  lifecycle<PurchaseRequestListProps, OwnState>(lifecycles),
)(PurchaseRequestListView);