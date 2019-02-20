import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { ISettlementGetAllFilter } from '@purchase/classes/filters/purchaseSettlement';
import { ISettlement } from '@purchase/classes/response/purchaseSettlement';
import { PurchaseField } from '@purchase/classes/types';
import { WithPurchaseSettlement, withPurchaseSettlement } from '@purchase/hoc/purchaseSettlement/withPurchaseSettlement';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, shallowEqual, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { IPurchaseSettlementListFilterResult } from './PurchaseSettlementListFilter';
import { PurchaseSettlementListView } from './PurchaseSettlementListView';

interface IOwnOption {

}

interface IOwnState extends IPurchaseSettlementListFilterResult {
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
  handleOnBind: (item: ISettlement, index: number) => IDataBindResult;

  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IPurchaseSettlementListFilterResult) => void;

  handleFilterBadge: () => boolean;
}

export type PurchaseSettlementListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithPurchaseSettlement
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<PurchaseSettlementListProps, IOwnState> = (props: PurchaseSettlementListProps): IOwnState => {
  const { request } = props.purchaseSettlementState.all;
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    // selected: [],
    fields: Object.keys(PurchaseField).map(key => ({
      value: key,
      name: PurchaseField[key]
    }))
  };
  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    // fill partial props from location state to handle redirection from dashboard notif
    state.statusType = props.location.state.statusType;
    state.isRejected = props.location.state.isRejected;
  } else {
    if (request && request.filter) {
      state.customerUid = request.filter.customerUid,
      state.statusType = request.filter.statusType,
      state.isRejected = request.filter.isRejected;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<PurchaseSettlementListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (prevState: IOwnState, props: PurchaseSettlementListProps) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: IPurchaseSettlementListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<PurchaseSettlementListProps, IOwnHandler> = {
  handleOnLoadApi: (props: PurchaseSettlementListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isLoading, request } = props.purchaseSettlementState.all;
    const { loadAllRequest } = props.purchaseSettlementDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: ISettlementGetAllFilter = {
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        customerUid: props.customerUid,
        statusType: props.statusType,
        isRejected: props.isRejected,
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
      if (shouldLoad || isRetry) {
        loadAllRequest({
          filter,
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: PurchaseSettlementListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.purchaseSettlementState.all;
    const { loadAllRequest } = props.purchaseSettlementDispatch;

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
  handleOnBind: (props: PurchaseSettlementListProps) => (item: ISettlement, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.projectUid || item.project && item.project.name || '',
    tertiary: item.customer && item.customer.name || item.customerUid || '',
    quaternary: item.actualInIDR && `${props.intl.formatNumber(item.actualInIDR, GlobalFormat.CurrencyDefault)}` || '',
    quinary: item.status && item.status.value || item.statusType || '',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: PurchaseSettlementListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: PurchaseSettlementListProps) => (filter: IPurchaseSettlementListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: PurchaseSettlementListProps) => () => {
    return props.customerUid !== undefined ||
      props.statusType !== undefined ||
      props.isRejected === true;
  },
};

const lifecycles: ReactLifeCycleFunctions<PurchaseSettlementListProps, IOwnState> = {
  componentDidUpdate(prevProps: PurchaseSettlementListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUid: this.props.customerUid,
        statusType: this.props.statusType,
        isRejected: this.props.isRejected
      },
      {
        customerUid: prevProps.customerUid,
        statusType: prevProps.statusType,
        isRejected: prevProps.isRejected
      }
    );
    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const PurchaseSettlementList = compose(
  setDisplayName('PurchaseSettlementList'),
  withUser,
  withPurchaseSettlement,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(PurchaseSettlementListView);
