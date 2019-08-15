import { IBasePagingFilter } from '@generic/interfaces';
import { IKPICategoryGetAllFilter } from '@kpi/classes/filter/category';
import { IKPICategory } from '@kpi/classes/response/category';
import { KPICategoryField } from '@kpi/classes/types/category/KPICategoryField';
import { withKPICategory, WithKPICategory } from '@kpi/hoc/withKPICategory';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, setDisplayName, shallowEqual, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { KPICategoryListView } from './KPICategoryListView';

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IKPICategory, index: number) => IDataBindResult;
}

export type KPICategoryListProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdater
  & WithUser
  & WithKPICategory
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<KPICategoryListProps, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(KPICategoryField).map(key => ({
      value: key,
      name: KPICategoryField[key]
    }))
  };

  return state;
};

const stateUpdaters: StateUpdaters<KPICategoryListProps, IOwnState, {}> = {
};

const handlerCreators: HandleCreators<KPICategoryListProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPICategoryListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.kpiCategoryState.all;
    const { loadAllRequest } = props.kpiCategoryDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IKPICategoryGetAllFilter = {
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
  handleOnLoadApiSearch: (props: KPICategoryListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.kpiCategoryState.all;
    const { loadAllRequest } = props.kpiCategoryDispatch;
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
  handleOnBind: (props: KPICategoryListProps) => (item: IKPICategory, index: number) => ({
    key: index,
    primary: item.name,
    secondary: props.intl.formatNumber(item.measurementCount),
    tertiary: '',
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
};

export const KPICategoryList = compose(
  setDisplayName('KPICategoryList'),
  withUser,
  withKPICategory,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(KPICategoryListView);