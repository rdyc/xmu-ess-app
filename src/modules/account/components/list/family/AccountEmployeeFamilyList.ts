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

import { IEmployeeFamilyAllFilter } from '@account/classes/filters/employeeFamily';
import { IEmployeeFamily } from '@account/classes/response/employeeFamily';
import { AccountEmployeeField } from '@account/classes/types/AccountEmployeeField';
import { WithAccountEmployeeFamily, withAccountEmployeeFamily } from '@account/hoc/withAccountEmployeeFamily';
import { AccountEmployeeFamilyListView } from './AccountEmployeeFamilyListView';

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
  handleOnBind: (item: IEmployeeFamily, index: number) => IDataBindResult;
}

export type AccountEmployeeFamilyListProps 
  = IOwnRouteParams
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithAccountEmployeeFamily
  & InjectedIntlProps
  & RouteComponentProps<IOwnRouteParams>;

const createProps: mapper<AccountEmployeeFamilyListProps, IOwnState> = (props: AccountEmployeeFamilyListProps): IOwnState => {  
  // default state
  const state: IOwnState = {
    fields: Object.keys(AccountEmployeeField).map(key => ({ 
      value: key, 
      name: AccountEmployeeField[key] 
    }))
  };
  
  return state;
};

const stateUpdaters: StateUpdaters<AccountEmployeeFamilyListProps, IOwnState, IOwnStateUpdater> = {
  
};

const handlerCreators: HandleCreators<AccountEmployeeFamilyListProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeFamilyListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.accountEmployeeFamilyState.all;
    const { loadAllRequest } = props.accountEmployeeFamilyDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IEmployeeFamilyAllFilter = {
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
  handleOnBind: (props: AccountEmployeeFamilyListProps) => (item: IEmployeeFamily, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.family ? item.family.value : 'N/A',
    tertiary: item.fullName,
    quaternary: item.gender ? item.gender.value : 'N/A',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeFamilyListProps, IOwnState> = {
  componentDidMount() {
    const { request } = this.props.accountEmployeeFamilyState.all;
    if (request && request.employeeUid !== this.props.match.params.employeeUid) {
      this.props.handleOnLoadApi(undefined, true, true);
    }
  }
};

export const AccountEmployeeFamilyList = compose(
  setDisplayName('AccountEmployeeFamilyList'),
  withUser,
  withAccountEmployeeFamily,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(AccountEmployeeFamilyListView);