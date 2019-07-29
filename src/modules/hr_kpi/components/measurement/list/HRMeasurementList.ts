import { IBasePagingFilter } from '@generic/interfaces';
import { IKPIMeasurementGetAllFilter } from '@KPI/classes/filter/measurement';
import { IKPIMeasurement } from '@KPI/classes/response/measurement';
import { KPIMeasurementField } from '@KPI/classes/types';
import { WithKPIMeasurement, withKPIMeasurement } from '@KPI/hoc/withKPIMeasurement';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, witKPIouter } from 'react-router';
import { compose, HandleCreators, mapper, setDisplayName, shallowEqual, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { KPIMeasurementListView } from './KPIMeasurementListView';

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IKPIMeasurement, index: number) => IDataBindResult;
}

export type KPIMeasurementListProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdater
  & WithUser
  & WithKPIMeasurement
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<KPIMeasurementListProps, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(KPIMeasurementField).map(key => ({
      value: key,
      name: KPIMeasurementField[key]
    }))
  };

  return state;
};

const stateUpdaters: StateUpdaters<KPIMeasurementListProps, IOwnState, {}> = {
};

const handlerCreators: HandleCreators<KPIMeasurementListProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIMeasurementListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.KPIMeasurementState.all;
    const { loadAllRequest } = props.KPIMeasurementDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IKPIMeasurementGetAllFilter = {
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
  handleOnLoadApiSearch: (props: KPIMeasurementListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.KPIMeasurementState.all;
    const { loadAllRequest } = props.KPIMeasurementDispatch;
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
  handleOnBind: (props: KPIMeasurementListProps) => (item: IKPIMeasurement, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.measurement && item.measurement.description || '',
    tertiary: item.description,
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
};

export const KPIMeasurementList = compose(
  setDisplayName('KPIMeasurementList'),
  withUser,
  withKPIMeasurement,
  witKPIouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(KPIMeasurementListView);