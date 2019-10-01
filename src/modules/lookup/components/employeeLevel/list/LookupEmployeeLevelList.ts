import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IEmployeeLevelAllFilter } from '@lookup/classes/filters';
import { IEmployeeLevel } from '@lookup/classes/response';
import { EmployeeLevelField } from '@lookup/classes/types';
import { WithEmployeeLevel, withEmployeeLevel } from '@lookup/hoc/withEmployeeLevel';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, setDisplayName, shallowEqual, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupEmployeeLevelListView } from './LookupEmployeeLevelListView';

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IEmployeeLevel, index: number) => IDataBindResult;
}

export type LookupEmployeeLevelListProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdater
  & WithUser
  & WithEmployeeLevel
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<LookupEmployeeLevelListProps, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(EmployeeLevelField).map(key => ({
      value: key,
      name: EmployeeLevelField[key]
    }))
  };

  return state;
};

const stateUpdaters: StateUpdaters<LookupEmployeeLevelListProps, IOwnState, {}> = {
};

const handlerCreators: HandleCreators<LookupEmployeeLevelListProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupEmployeeLevelListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.employeeLevelState.all;
    const { loadAllRequest } = props.employeeLevelDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IEmployeeLevelAllFilter = {
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
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: LookupEmployeeLevelListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.employeeLevelState.all;
    const { loadAllRequest } = props.employeeLevelDispatch;
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
          filter
        });
      }
    }
  },
  handleOnBind: (props: LookupEmployeeLevelListProps) => (item: IEmployeeLevel, index: number) => ({
    key: index,
    primary: item.seq.toString(),
    secondary: item.value,
    tertiary: '',
    quaternary: item.description,
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
};

export const LookupEmployeeLevelList = compose(
  setDisplayName('LookupEmployeeLevelList'),
  withUser,
  withEmployeeLevel,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(LookupEmployeeLevelListView);