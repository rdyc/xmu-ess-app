import { IBasePagingFilter } from '@generic/interfaces';
import { IKPIOpenGetAllFilter } from '@kpi/classes/filter/open';
import { IKPIOpen } from '@kpi/classes/response/open';
import { KPIOpenField } from '@kpi/classes/types/open/KPIOpenField';
import { withKPIOpen, WithKPIOpen } from '@kpi/hoc/withKPIOpen';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, setDisplayName, shallowEqual, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { KPIOpenListView } from './KPIOpenListView';

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IKPIOpen, index: number) => IDataBindResult;
}

export type KPIOpenListProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdater
  & WithUser
  & WithKPIOpen
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<KPIOpenListProps, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(KPIOpenField).map(key => ({
      value: key,
      name: KPIOpenField[key]
    }))
  };

  return state;
};

const stateUpdaters: StateUpdaters<KPIOpenListProps, IOwnState, {}> = {
};

const handlerCreators: HandleCreators<KPIOpenListProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIOpenListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.kpiOpenState.all;
    const { loadAllRequest } = props.kpiOpenDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IKPIOpenGetAllFilter = {
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
  handleOnLoadApiSearch: (props: KPIOpenListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.kpiOpenState.all;
    const { loadAllRequest } = props.kpiOpenDispatch;
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
  handleOnBind: (props: KPIOpenListProps) => (item: IKPIOpen, index: number) => ({
    key: index,
    primary: item.year.toString(),
    secondary: item.period === 1 && props.intl.formatMessage(kpiMessage.employee.field.periodMidYear) || props.intl.formatMessage(kpiMessage.employee.field.periodFullYear),
    tertiary: props.intl.formatDate(item.date, GlobalFormat.Date),
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
};

export const KPIOpenList = compose(
  setDisplayName('KPIOpenList'),
  withUser,
  withKPIOpen,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(KPIOpenListView);