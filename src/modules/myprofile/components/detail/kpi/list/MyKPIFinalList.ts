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

import { IKPIFinalGetAllFilter } from '@kpi/classes/filter';
import { IKPIFinal } from '@kpi/classes/response';
import { KPIFinalField } from '@kpi/classes/types';
import { WithKPIFinal, withKPIFinal } from '@kpi/hoc/withKPIFinal';
import { ICollectionValue } from '@layout/classes/core';
import { MyKPIAssignListView } from './MyKPIFinalListView';

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
  handleOnBind: (item: IKPIFinal, index: number) => IDataBindResult;
}

export type MyKPIFinalListProps 
  = IOwnOption
  & RouteComponentProps<IOwnRouteParams>
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithKPIFinal
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<MyKPIFinalListProps, IOwnState> = (): IOwnState => {
  // default state
  const state: IOwnState = {
    fields: Object.keys(KPIFinalField).map(key => ({
      value: key,
      name: KPIFinalField[key]
    }))
  };

  return state;
};

const stateUpdaters: StateUpdaters<MyKPIFinalListProps, IOwnState, IOwnStateUpdater> = {
};

const handlerCreators: HandleCreators<MyKPIFinalListProps, IOwnHandler> = {
  handleOnLoadApi: (props: MyKPIFinalListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.kpiFinalState.all;
    const { loadAllRequest } = props.kpiFinalDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IKPIFinalGetAllFilter = {
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
      if (isExpired || shouldLoad || isRetry ) {
        loadAllRequest({
          filter,
          employeeUid: user.uid
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: MyKPIFinalListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.kpiFinalState.all;
    const { loadAllRequest } = props.kpiFinalDispatch;
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
  handleOnBind: () => (item: IKPIFinal, index: number) => ({
    key: index,
    primary: item.employee && item.employee.fullName || '',
    secondary: item.year.toString(),
    tertiary: `Semester ${item.period.toString()}`,
    quaternary: `${item.totalScore.toString()} %`,
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    
  }),
};

const lifecycles: ReactLifeCycleFunctions<MyKPIFinalListProps, IOwnState> = {
  componentDidUpdate() {
    // 
  }
};

export const MyKPIFinalList = compose(
  setDisplayName('MyKPIFinalList'),
  withUser,
  withKPIFinal,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(MyKPIAssignListView);