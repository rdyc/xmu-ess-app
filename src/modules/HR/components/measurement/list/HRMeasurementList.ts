import { IBasePagingFilter } from '@generic/interfaces';
import { IHRMeasurementGetAllFilter } from '@hr/classes/filter/measurement';
import { IHRMeasurement } from '@hr/classes/response/measurement';
import { HRMeasurementField } from '@hr/classes/types';
import { WithHRMeasurement, withHRMeasurement } from '@hr/hoc/withHRMeasurement';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, setDisplayName, shallowEqual, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { HRMeasurementListView } from './HRMeasurementListView';

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IHRMeasurement, index: number) => IDataBindResult;
}

export type HRMeasurementListProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdater
  & WithUser
  & WithHRMeasurement
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<HRMeasurementListProps, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(HRMeasurementField).map(key => ({
      value: key,
      name: HRMeasurementField[key]
    }))
  };

  return state;
};

const stateUpdaters: StateUpdaters<HRMeasurementListProps, IOwnState, {}> = {
};

const handlerCreators: HandleCreators<HRMeasurementListProps, IOwnHandler> = {
  handleOnLoadApi: (props: HRMeasurementListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.hrMeasurementState.all;
    const { loadAllRequest } = props.hrMeasurementDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IHRMeasurementGetAllFilter = {
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
  handleOnLoadApiSearch: (props: HRMeasurementListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.hrMeasurementState.all;
    const { loadAllRequest } = props.hrMeasurementDispatch;
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
  handleOnBind: (props: HRMeasurementListProps) => (item: IHRMeasurement, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.measurement && item.measurement.description || item.measurementType,
    tertiary: item.description,
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
};

export const HRMeasurementList = compose(
  setDisplayName('HRMeasurementList'),
  withUser,
  withHRMeasurement,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(HRMeasurementListView);