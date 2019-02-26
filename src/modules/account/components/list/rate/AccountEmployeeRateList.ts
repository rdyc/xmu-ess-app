import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  shallowEqual,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { IEmployeeRateAllFilter } from '@account/classes/filters/employeeRate';
import { IEmployeeRate } from '@account/classes/response/employeeRate';
import { AccountEmployeeRateField } from '@account/classes/types/AccountEmployeeField';
import { WithAccountEmployeeRate, withAccountEmployeeRate } from '@account/hoc/withAccountEmployeeRate';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { GlobalFormat } from '@layout/types';
import { AccountEmployeeRateListView } from './AccountEmployeeRateListView';

interface IOwnRouteParams {
  employeeUid: string;
}

interface IOwnState extends IEmployeeRateAllFilter {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
 
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnBind: (item: IEmployeeRate, index: number) => IDataBindResult;
}

export type AccountEmployeeRateListProps 
  = IOwnRouteParams
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithAccountEmployeeRate
  & InjectedIntlProps
  & RouteComponentProps<IOwnRouteParams>;

const createProps: mapper<AccountEmployeeRateListProps, IOwnState> = (): IOwnState => {  
  // default state
  const state: IOwnState = {
    fields: Object.keys(AccountEmployeeRateField).map(key => ({ 
      value: key, 
      name: AccountEmployeeRateField[key] 
    })),
  };
  
  return state;
};

const stateUpdaters: StateUpdaters<AccountEmployeeRateListProps, IOwnState, IOwnStateUpdater> = {
  
};

const handlerCreators: HandleCreators<AccountEmployeeRateListProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeRateListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isLoading, request } = props.accountEmployeeRateState.all;
    const { loadAllRequest } = props.accountEmployeeRateDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IEmployeeRateAllFilter = {
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy || 'isActive',
        direction: params && params.direction || request && request.filter && request.filter.direction || 'descending',
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (shouldLoad || isRetry) {
        loadAllRequest({
          filter,
          employeeUid: props.match.params.employeeUid,
        });
      }
    }
  },
  handleOnBind: (props: AccountEmployeeRateListProps) => (item: IEmployeeRate, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: props.intl.formatNumber(item.value, GlobalFormat.CurrencyDefault),
    tertiary: item.isActive ? props.intl.formatMessage(accountMessage.rate.field.isActiveTrue) : props.intl.formatMessage(accountMessage.rate.field.isActiveFalse),
    quaternary: item.changes && props.intl.formatDate(item.changes.createdAt, GlobalFormat.Date) || 'N/A',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeRateListProps, IOwnState> = {
};

export const AccountEmployeeRateList = compose(
  setDisplayName('AccountEmployeeRateList'),
  withUser,
  withAccountEmployeeRate,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(AccountEmployeeRateListView);