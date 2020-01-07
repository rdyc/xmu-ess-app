import { IBasePagingFilter } from '@generic/interfaces';
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

import { IKPIAssign } from '@account/classes/response/employeeKPIAssign';
import { withAccountEmployeeKPIAssign, WithAccountEmployeeKPIAssign } from '@account/hoc/withAccountEmployeeKPIAssign';
import { IKPIAssignGetAllFilter } from '@kpi/classes/filter';
import { KPIAssignField } from '@kpi/classes/types/assign/KPIAssignField';
import { ICollectionValue } from '@layout/classes/core';
import { MyKPIAssignListView } from './MyKPIAssignListView';

interface IOwnRouteParams {
}

interface IOwnOption {
}

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IKPIAssign, index: number) => IDataBindResult;
}

export type MyKPIAssignListProps 
  = IOwnOption
  & RouteComponentProps<IOwnRouteParams>
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithAccountEmployeeKPIAssign
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<MyKPIAssignListProps, IOwnState> = (props: MyKPIAssignListProps): IOwnState => {
  // default state
  const state: IOwnState = {
    fields: Object.keys(KPIAssignField).map(key => ({
      value: key,
      name: KPIAssignField[key]
    }))
  };

  return state;
};

const stateUpdaters: StateUpdaters<MyKPIAssignListProps, IOwnState, IOwnStateUpdater> = {
  
};

const handlerCreators: HandleCreators<MyKPIAssignListProps, IOwnHandler> = {
  handleOnLoadApi: (props: MyKPIAssignListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.accountEmployeeKPIAssignState.all;
    const { loadAllRequest } = props.accountEmployeeKPIAssignDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IKPIAssignGetAllFilter = {
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
          employeeUid: user.uid,
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: MyKPIAssignListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.accountEmployeeKPIAssignState.all;
    const { loadAllRequest } = props.accountEmployeeKPIAssignDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter = {
        ...request && request.filter,
        find,
        findBy,
        page: undefined
      };
      
      // compare request
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (shouldLoad) {
        loadAllRequest({
          filter,
          employeeUid : user.uid
        });
      }
    }
  },
  handleOnBind: (props: MyKPIAssignListProps) => (item: IKPIAssign, index: number) => ({
    key: index,
    primary: item.employee && item.employee.fullName || '',
    secondary: item.year.toString(),
    tertiary: '',
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    
  }),
};

const lifecycles: ReactLifeCycleFunctions<MyKPIAssignListProps, IOwnState> = {
  componentDidUpdate(prevProps: MyKPIAssignListProps) {
    // 
  }
};

export const MyKPIAssignList = compose(
  setDisplayName('MyKPIAssignList'),
  withUser,
  withAccountEmployeeKPIAssign,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(MyKPIAssignListView);