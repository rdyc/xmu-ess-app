import { IEmployeeContractAllFilter } from '@account/classes/filters/employeeContract';
import { IEmployeeContract } from '@account/classes/response/employeeContract';
import { AccountEmployeeField } from '@account/classes/types/AccountEmployeeField';
import { WithAccountEmployeeContract, withAccountEmployeeContract } from '@account/hoc/withAccountEmployeeContract';
import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
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

import { AccountEmployeeContractListView } from './AccountEmployeeContractListView';

interface IOwnRouteParams {
  employeeUid: string;
}

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
 
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnBind: (item: IEmployeeContract, index: number) => IDataBindResult;
}

export type AccountEmployeeContractListProps 
  = IOwnRouteParams
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithAccountEmployeeContract
  & InjectedIntlProps
  & RouteComponentProps<IOwnRouteParams>;

const createProps: mapper<AccountEmployeeContractListProps, IOwnState> = (props: AccountEmployeeContractListProps): IOwnState => {  
  // default state
  const state: IOwnState = {
    fields: Object.keys(AccountEmployeeField).map(key => ({ 
      value: key, 
      name: AccountEmployeeField[key] 
    }))
  };
  
  return state;
};

const stateUpdaters: StateUpdaters<AccountEmployeeContractListProps, IOwnState, IOwnStateUpdater> = {
  
};

const handlerCreators: HandleCreators<AccountEmployeeContractListProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeContractListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.accountEmployeeContractState.all;
    const { loadAllRequest } = props.accountEmployeeContractDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IEmployeeContractAllFilter = {
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
          employeeUid: props.match.params.employeeUid,
        });
      }
    }
  },
  handleOnBind: (props: AccountEmployeeContractListProps) => (item: IEmployeeContract, index: number) => ({
    key: index,
    primary: item.contractNumber,
    secondary: props.intl.formatDate(item.start, GlobalFormat.Date),
    tertiary: props.intl.formatDate(item.end, GlobalFormat.Date),
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeContractListProps, IOwnState> = {
  componentDidMount() {
    const { request } = this.props.accountEmployeeContractState.all;
    if (request && request.employeeUid !== this.props.match.params.employeeUid) {
      this.props.handleOnLoadApi(undefined, true, true);
    }
  }
};

export const AccountEmployeeContractList = compose(
  setDisplayName('AccountEmployeeContractList'),
  withUser,
  withAccountEmployeeContract,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(AccountEmployeeContractListView);