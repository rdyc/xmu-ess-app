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

import { IEmployeeKPIFinalAllFilter } from '@account/classes/filters/employeeKPIFinal';
import { IKPIFinal } from '@account/classes/response/employeeKPIFinal';
import { WithAccountEmployeeKPIFinal, withAccountEmployeeKPIFinal } from '@account/hoc/withAccountEmployeeKPIFinal';
import { KPIFinalField } from '@kpi/classes/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ICollectionValue } from '@layout/classes/core';
import { KPIAssignListView } from './KPIFinalListView';

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
  handleOnBind: (item: IKPIFinal, index: number) => IDataBindResult;
}

export type KPIFinalListProps 
  = IOwnOption
  & RouteComponentProps<IOwnRouteParams>
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithAccountEmployeeKPIFinal
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<KPIFinalListProps, IOwnState> = (): IOwnState => {
  // default state
  const state: IOwnState = {
    fields: Object.keys(KPIFinalField).map(key => ({
      value: key,
      name: KPIFinalField[key]
    }))
  };

  return state;
};

const stateUpdaters: StateUpdaters<KPIFinalListProps, IOwnState, IOwnStateUpdater> = {
};

const handlerCreators: HandleCreators<KPIFinalListProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIFinalListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.accountEmployeeKPIFinalState.all;
    const { loadAllRequest } = props.accountEmployeeKPIFinalDispatch;
    const { user } = props.userState;

    if (user && !isLoading && props.match.params.employeeUid) {
      // predefined filter
      const filter: IEmployeeKPIFinalAllFilter = {
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      const isEmployeeChanged = !shallowEqual(props.match.params.employeeUid, request && request.employeeUid || '');
      
      // only load when request parameter are differents
      if (isExpired || shouldLoad || isRetry || isEmployeeChanged) {
        loadAllRequest({
          filter,
          employeeUid: props.match.params.employeeUid
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: KPIFinalListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.accountEmployeeKPIFinalState.all;
    const { loadAllRequest } = props.accountEmployeeKPIFinalDispatch;
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
          employeeUid : props.match.params.employeeUid
        });
      }
    }
  },
  handleOnBind: (props: KPIFinalListProps) => (item: IKPIFinal, index: number) => ({
    key: index,
    primary: item.employee && item.employee.fullName || '',
    secondary: item.year.toString(),
    tertiary: item.period === 1 && props.intl.formatMessage(kpiMessage.employee.field.periodMidYear) || props.intl.formatMessage(kpiMessage.employee.field.periodFullYear),
    quaternary: `${item.totalScore.toString()} %`,
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    
  }),
};

const lifecycles: ReactLifeCycleFunctions<KPIFinalListProps, IOwnState> = {
  componentDidUpdate() {
    // 
  }
};

export const KPIFinalList = compose(
  setDisplayName('KPIFinalList'),
  withUser,
  withAccountEmployeeKPIFinal,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(KPIAssignListView);