import { IBasePagingFilter } from '@generic/interfaces';
import { INotifPeriodGetAllFilter } from '@hr.notification/classes/filters/period';
import { NotifPeriodField, NotifPeriodRangeType } from '@hr.notification/classes/types';
import { WithNotifPeriod, withNotifPeriod } from '@hr.notification/hoc/withNotifPeriod';
import { ICollectionValue } from '@layout/classes/core';
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
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { INotifPeriod } from '@hr.notification/classes/response';
import { INotifPeriodListFilterResult } from './NotifPeriodListFilter';
import { NotifPeriodListView } from './NotifPeriodListView';

interface IOwnOption {
  
}

interface IOwnState extends INotifPeriodListFilterResult {
  fields: ICollectionValue[];
  isFilterOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: INotifPeriod, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: INotifPeriodListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type NotifPeriodListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithNotifPeriod
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<NotifPeriodListProps, IOwnState> = (): IOwnState => {
  
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(NotifPeriodField).map(key => ({ 
      value: key, 
      name: NotifPeriodField[key] 
    }))
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  /* if (props.location.state) {
    state.isRejected = props.location.state.isRejected;
    state.isNewOwner = props.location.state.isNewOwner;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.customerUid = request.filter.direction,
      state.projectType = request.filter.projectType,
      state.statusType = request.filter.statusType,
      state.status = request.filter.status,
      state.isRejected = request.filter.isRejected;
      state.isNewOwner = request.filter.isNewOwner;
    }
  } */

  return state;
};

const stateUpdaters: StateUpdaters<NotifPeriodListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: () => (filter: INotifPeriodListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<NotifPeriodListProps, IOwnHandler> = {
  handleOnLoadApi: (props: NotifPeriodListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.notifPeriodState.all;
    const { loadAllRequest } = props.notifPeriodDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: INotifPeriodGetAllFilter = {
        type: props.type,
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
  handleOnLoadApiSearch: (props: NotifPeriodListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.notifPeriodState.all;
    const { loadAllRequest } = props.notifPeriodDispatch;

    if (props.userState.user && !isLoading) {
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
  handleOnBind: (props: NotifPeriodListProps) => (item: INotifPeriod, index: number) => ({
    key: index,
    primary: item.name,
    secondary: item.type,
    tertiary: NotifPeriodRangeType[item.range],
    quaternary: `${props.intl.formatNumber(item.from)} - ${props.intl.formatNumber(item.to)}`,
    quinary: '',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: NotifPeriodListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: NotifPeriodListProps) => (filter: INotifPeriodListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: NotifPeriodListProps) => () => {
    return props.type !== undefined;
  }
};

const lifecycles: ReactLifeCycleFunctions<NotifPeriodListProps, IOwnState> = {
  componentDidUpdate(prevProps: NotifPeriodListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        type: this.props.type
      },
      {
        type: prevProps.type
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const NotifPeriodList = compose(
  setDisplayName('NotifPeriodList'),
  withUser,
  withNotifPeriod,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(NotifPeriodListView);