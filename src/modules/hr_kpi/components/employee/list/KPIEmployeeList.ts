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

import { IKPIEmployeeGetAllFilter } from '@kpi/classes/filter';
import { IKPIEmployee } from '@kpi/classes/response';
import { KPIEmployeeField } from '@kpi/classes/types';
import { withKPIEmployee, WithKPIEmployee } from '@kpi/hoc/withKPIEmployee';
import { ICollectionValue } from '@layout/classes/core';
import { KPIEmployeeListView } from './KPIEmployeeListView';

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
  handleOnBind: (item: IKPIEmployee, index: number) => IDataBindResult;
}

export type KPIEmployeeListProps 
  = IOwnOption
  & RouteComponentProps<IOwnRouteParams>
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithKPIEmployee
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<KPIEmployeeListProps, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(KPIEmployeeField).map(key => ({
      value: key,
      name: KPIEmployeeField[key]
    }))
  };

  return state;
};

const stateUpdaters: StateUpdaters<KPIEmployeeListProps, IOwnState, IOwnStateUpdater> = {
  
};

const handlerCreators: HandleCreators<KPIEmployeeListProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIEmployeeListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.kpiEmployeeState.all;
    const { loadAllRequest } = props.kpiEmployeeDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IKPIEmployeeGetAllFilter = {
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
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: KPIEmployeeListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.kpiEmployeeState.all;
    const { loadAllRequest } = props.kpiEmployeeDispatch;
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
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        });
      }
    }
  },
  handleOnBind: (props: KPIEmployeeListProps) => (item: IKPIEmployee, index: number) => ({
    key: index,
    primary: item.kpiAssign && item.kpiAssign.employee && item.kpiAssign.employee.fullName || '',
    secondary: item.kpiAssign && item.kpiAssign.year.toString() || '',
    tertiary: `Semester ${props.intl.formatNumber(item.period)}`,
    quaternary: `${props.intl.formatNumber(item.totalScore)} %`,
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    
  }),
};

const lifecycles: ReactLifeCycleFunctions<KPIEmployeeListProps, IOwnState> = {
  componentDidUpdate(prevProps: KPIEmployeeListProps) {
    // 
  }
};

export const KPIEmployeeList = compose(
  setDisplayName('KPIEmployeeList'),
  withUser,
  withKPIEmployee,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(KPIEmployeeListView);