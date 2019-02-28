import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { IPurchaseGetAllFilter } from '@purchase/classes/filters/purchaseRequest';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseField } from '@purchase/classes/types';
import { WithPurchaseRequest, withPurchaseRequest } from '@purchase/hoc/purchaseRequest/withPurchaseRequest';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, shallowEqual, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { IPurchaseRequestListFilterResult } from './PurchaseRequestListFilter';
import { PurchaseRequestListView } from './PurchaseRequestListView';

interface IOwnOption {
  
}

interface IOwnState extends IPurchaseRequestListFilterResult {
  fields: ICollectionValue[];
  isFilterOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IPurchase, index: number) => IDataBindResult;

  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IPurchaseRequestListFilterResult) => void;

  handleFilterBadge: () => boolean;
}

export type PurchaseRequestListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithPurchaseRequest
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<PurchaseRequestListProps, IOwnState> = (props: PurchaseRequestListProps): IOwnState => {
  const { request } = props.purchaseRequestState.all;
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    status: 'pending',
    fields: Object.keys(PurchaseField).map(key => ({
      value: key,
      name: PurchaseField[key]
    }))
  };
  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    // fill partial props from location state to handle redirection from dashboard notif
    state.statusType = props.location.state.statusType;
    state.status = props.location.state.status;
    state.isSettlement = props.location.state.isSettlement;
    state.isRejected = props.location.state.isRejected;
  } else {
    if (request && request.filter) {
      state.customerUid = request.filter.customerUid,
      state.statusType = request.filter.statusType,
      state.status = request.filter.status,
      state.isSettlement = request.filter.isSettlement;
      state.isRejected = request.filter.isRejected;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<PurchaseRequestListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (prevState: IOwnState, props: PurchaseRequestListProps) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: IPurchaseRequestListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<PurchaseRequestListProps, IOwnHandler> = {
  handleOnLoadApi: (props: PurchaseRequestListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.purchaseRequestState.all;
    const { loadAllRequest } = props.purchaseRequestDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IPurchaseGetAllFilter = {
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        customerUid: props.customerUid,
        statusType: props.statusType,
        isRejected: props.isRejected,
        isSettlement: props.isSettlement,
        status: props.status,
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});

      // only load when request parameter are differents
      if (isExpired || shouldLoad || isRetry) {
        loadAllRequest({
          filter,
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: PurchaseRequestListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.purchaseRequestState.all;
    const { loadAllRequest } = props.purchaseRequestDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter = {
        ...request && request.filter,
        find,
        findBy,
        page: undefined,
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid
      };

      // compare request
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});

      // only load when request parameter are differents
      if (shouldLoad) {
        loadAllRequest({
          filter,
        });
      }
    }
  },
  handleOnBind: (props: PurchaseRequestListProps) => (item: IPurchase, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.projectUid || item.project && item.project.name || '',
    tertiary: item.customer && item.customer.name || item.customerUid || '',
    quaternary: item.requestIDR && `${props.intl.formatNumber(item.requestIDR, GlobalFormat.CurrencyDefault)}` || '',
    quinary: item.status && item.status.value || item.statusType || '',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: PurchaseRequestListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: PurchaseRequestListProps) => (filter: IPurchaseRequestListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: PurchaseRequestListProps) => () => {
    return props.customerUid !== undefined ||
      props.statusType !== undefined ||
      props.status !== 'pending' ||
      props.isRejected === true ||
      props.isSettlement === true;
  },
};

const lifecycles: ReactLifeCycleFunctions<PurchaseRequestListProps, IOwnState> = {
  componentDidUpdate(prevProps: PurchaseRequestListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUid: this.props.customerUid,
        statusType: this.props.statusType,
        status: this.props.status,
        isRejected: this.props.isRejected,
        isSettlement: this.props.isSettlement
      },
      {
        customerUid: prevProps.customerUid,
        statusType: prevProps.statusType,
        status: prevProps.status,
        isRejected: prevProps.isRejected,
        isSettlement: prevProps.isSettlement
      }
    );
    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const PurchaseRequestList = compose(
  setDisplayName('PurchaseRequestList'),
  withUser,
  withPurchaseRequest,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(PurchaseRequestListView);
