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

import { IEmployeeKPIGetAllFilter } from '@kpi/classes/filter';
import { IEmployeeKPI } from '@kpi/classes/response';
import { EmployeeKPIField } from '@kpi/classes/types';
import { withEmployeeKPI, WithEmployeeKPI } from '@kpi/hoc/withEmployeeKPI';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ICollectionValue } from '@layout/classes/core';
import { EmployeeKPIListView } from './EmployeeKPIListView';

interface IOwnRouteParams {
  employeeUid: string;
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
  handleOnBind: (item: IEmployeeKPI, index: number) => IDataBindResult;
}

export type EmployeeKPIListProps 
  = IOwnOption
  & RouteComponentProps<IOwnRouteParams>
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithEmployeeKPI
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<EmployeeKPIListProps, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(EmployeeKPIField).map(key => ({
      value: key,
      name: EmployeeKPIField[key]
    }))
  };

  return state;
};

const stateUpdaters: StateUpdaters<EmployeeKPIListProps, IOwnState, IOwnStateUpdater> = {
  
};

const handlerCreators: HandleCreators<EmployeeKPIListProps, IOwnHandler> = {
  handleOnLoadApi: (props: EmployeeKPIListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.employeeKPIState.all;
    const { loadAllRequest } = props.employeeKPIDispatch;
    const { user } = props.userState;

    if (user && !isLoading && props.match.params.employeeUid) {
      // predefined filter
      const filter: IEmployeeKPIGetAllFilter = {
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      const employeeUid = props.match.params.employeeUid;
      
      // only load when request parameter are differents
      if (isExpired || shouldLoad || isRetry) {
        loadAllRequest({
          filter,
          employeeUid
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: EmployeeKPIListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.employeeKPIState.all;
    const { loadAllRequest } = props.employeeKPIDispatch;
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
      const employeeUid = props.match.params.employeeUid;
      
      // only load when request parameter are differents
      if (shouldLoad) {
        loadAllRequest({
          filter,
          employeeUid
        });
      }
    }
  },
  handleOnBind: (props: EmployeeKPIListProps) => (item: IEmployeeKPI, index: number) => ({
    key: index,
    primary: props.intl.formatNumber(item.year),
    secondary: `Semester ${props.intl.formatNumber(item.period)}`,
    tertiary: `${props.intl.formatNumber(item.period)} %`,
    quaternary: item.isFinal && props.intl.formatMessage(kpiMessage.employee.field.isFinalTrue) || props.intl.formatMessage(kpiMessage.employee.field.isFinalFalse),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    
  }),
};

const lifecycles: ReactLifeCycleFunctions<EmployeeKPIListProps, IOwnState> = {
  componentDidUpdate(prevProps: EmployeeKPIListProps) {
    //
  }
};

export const EmployeeKPIList = compose(
  setDisplayName('EmployeeKPIList'),
  withUser,
  withEmployeeKPI,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(EmployeeKPIListView);