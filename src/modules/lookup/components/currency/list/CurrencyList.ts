import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { ILookupCurrency } from '@lookup/classes';
import { ICurrencyAllFilter } from '@lookup/classes/filters';
import { ICurrency } from '@lookup/classes/response';
import { CurrencyField } from '@lookup/classes/types';
import { withLookupCurrency, WithLookupCurrency } from '@lookup/hoc/withLookupCurrency';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, setDisplayName, shallowEqual, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { CurrencyListView } from './CurrencyListView';

interface IOwnOption {
  
}

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // setFilterVisibility: StateHandler<IOwnState>;
  // setFilterApplied: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: ILookupCurrency, index: number) => IDataBindResult;

  // handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  // handleFilterApplied: (filter: IPurchaseRequestListFilterResult) => void;

  // handleFilterBadge: () => boolean;
}

export type CurrencyListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupCurrency
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<CurrencyListProps, IOwnState> = (): IOwnState => {
  // default state
  const state: IOwnState = {
    fields: Object.keys(CurrencyField).map(key => ({
      value: key,
      name: CurrencyField[key]
    }))
  };

  return state;
};

const stateUpdaters: StateUpdaters<CurrencyListProps, IOwnState, IOwnStateUpdater> = {

};

const handlerCreators: HandleCreators<CurrencyListProps, IOwnHandler> = {
  handleOnLoadApi: (props: CurrencyListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.lookupCurrencyState.all;
    const { loadAllRequest } = props.lookupCurrencyDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: ICurrencyAllFilter = {
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
  handleOnLoadApiSearch: (props: CurrencyListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.lookupCurrencyState.all;
    const { loadAllRequest } = props.lookupCurrencyDispatch;

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
  handleOnBind: (props: CurrencyListProps) => (item: ICurrency, index: number) => ({
    key: index,
    primary: item.symbol,
    secondary: item.name,
    tertiary: props.intl.formatNumber(item.rate, GlobalFormat.CurrencyDefault),
    quaternary: item.isActive
      ? props.intl.formatMessage(lookupMessage.currency.field.isActive)
      : props.intl.formatMessage(lookupMessage.currency.field.isNotActive),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  })
};

// const lifecycles: ReactLifeCycleFunctions<CurrencyListProps, IOwnState> = {
//   componentDidUpdate(prevProps: CurrencyListProps) {
//     // track any changes in filter props
//     const isFilterChanged = !shallowEqual(
//       {
//         customerUid: this.props.customerUid,
//         statusType: this.props.statusType,
//         isRejected: this.props.isRejected,
//         isSettlement: this.props.isSettlement
//       },
//       {
//         customerUid: prevProps.customerUid,
//         statusType: prevProps.statusType,
//         isRejected: prevProps.isRejected,
//         isSettlement: prevProps.isSettlement
//       }
//     );
//     if (isFilterChanged) {
//       this.props.handleOnLoadApi(undefined, true);
//     }
//   }
// };

export const CurrencyList = compose(
  setDisplayName('LookupCurrencyList'),
  withUser,
  withLookupCurrency,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  // lifecycle(lifecycles),
)(CurrencyListView);
