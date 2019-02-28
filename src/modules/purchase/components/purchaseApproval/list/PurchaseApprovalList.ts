import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { IPurchaseApprovalGetAllFilter } from '@purchase/classes/filters/purchaseApproval';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseField } from '@purchase/classes/types';
import { WithPurchaseApproval, withPurchaseApproval } from '@purchase/hoc/purchaseApproval/withPurchaseApproval';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, shallowEqual, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { IPurchaseApprovalListFilterResult } from './PurchaseApprovalListFilter';
import { PurchaseApprovalListView } from './PurchaseApprovalListView';

interface IOwnOption {
  
}

interface IOwnState extends IPurchaseApprovalListFilterResult {
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
  handleFilterApplied: (filter: IPurchaseApprovalListFilterResult) => void;

  handleFilterBadge: () => boolean;
}

export type PurchaseApprovalListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithPurchaseApproval
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<PurchaseApprovalListProps, IOwnState> = (props: PurchaseApprovalListProps): IOwnState => {
  const { request } = props.purchaseApprovalState.all;
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
    state.isNotify = props.location.state.isNotify;
    state.status = props.location.state.status;
  } else {
    if (request && request.filter) {
      state.customerUid = request.filter.customerUid,
      state.statusType = request.filter.statusType,
      state.isNotify = request.filter.isNotify;
      state.status = request.filter.status;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<PurchaseApprovalListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (prevState: IOwnState, props: PurchaseApprovalListProps) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: IPurchaseApprovalListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<PurchaseApprovalListProps, IOwnHandler> = {
  handleOnLoadApi: (props: PurchaseApprovalListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.purchaseApprovalState.all;
    const { loadAllRequest } = props.purchaseApprovalDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IPurchaseApprovalGetAllFilter = {
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        customerUid: props.customerUid,
        statusType: props.statusType,
        status: props.status,
        isNotify: props.isNotify,
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
  handleOnLoadApiSearch: (props: PurchaseApprovalListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.purchaseApprovalState.all;
    const { loadAllRequest } = props.purchaseApprovalDispatch;

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
  handleOnBind: (props: PurchaseApprovalListProps) => (item: IPurchase, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.projectUid || item.project && item.project.name || '',
    tertiary: item.customer && item.customer.name || item.customerUid || '',
    quaternary: item.requestIDR && `${props.intl.formatNumber(item.requestIDR, GlobalFormat.CurrencyDefault)}` || '',
    quinary: item.status && item.status.value || item.statusType || '',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: PurchaseApprovalListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: PurchaseApprovalListProps) => (filter: IPurchaseApprovalListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: PurchaseApprovalListProps) => () => {
    return props.customerUid !== undefined ||
      props.statusType !== undefined ||
      props.isNotify === true ||
      props.status !== 'pending';
  },
};

const lifecycles: ReactLifeCycleFunctions<PurchaseApprovalListProps, IOwnState> = {
  componentDidUpdate(prevProps: PurchaseApprovalListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUid: this.props.customerUid,
        statusType: this.props.statusType,
        isNotify: this.props.isNotify,
        status: this.props.status
      },
      {
        customerUid: prevProps.customerUid,
        statusType: prevProps.statusType,
        isNotify: prevProps.isNotify,
        status: prevProps.status
      }
    );
    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const PurchaseApprovalList = compose(
  setDisplayName('PurchaseApprovalList'),
  withUser,
  withPurchaseApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(PurchaseApprovalListView);
