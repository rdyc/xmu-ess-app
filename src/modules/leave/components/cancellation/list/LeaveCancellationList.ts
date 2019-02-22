import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILeaveCancellationGetAllFilter } from '@leave/classes/filters/cancellation';
import { ILeave } from '@leave/classes/response';
import { LeaveRequestField } from '@leave/classes/types';
import { WithLeaveCancellation, withLeaveCancellation } from '@leave/hoc/withLeaveCancellation';
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

import { ILeaveCancellationListFilterResult } from './LeaveCancellationListFilter';
import { LeaveCancellationListView } from './LeaveCancellationListView';

interface IOwnOption {

}

interface IOwnState extends ILeaveCancellationListFilterResult {
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
  handleOnBind: (item: ILeave, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ILeaveCancellationListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type LeaveCancellationListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLeaveCancellation
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<LeaveCancellationListProps, IOwnState> = (props: LeaveCancellationListProps): IOwnState => {
  const { request } = props.leaveCancellationState.all;

  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(LeaveRequestField).map(key => ({
      value: key,
      name: LeaveRequestField[key]
    }))
  };

  if (request && request.filter) {
    state.employeeUid = request.filter.employeeUid;
  }
  return state;
};

const stateUpdaters: StateUpdaters<LeaveCancellationListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILeaveCancellationListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<LeaveCancellationListProps, IOwnHandler> = {
  handleOnLoadApi: (props: LeaveCancellationListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { user } = props.userState;
    const { isLoading, request } = props.leaveCancellationState.all;
    const { loadAllRequest } = props.leaveCancellationDispatch;

    if (user && !isLoading) {
      // predefined filter
      const filter: ILeaveCancellationGetAllFilter = {
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
      if (shouldLoad || isRetry) {
        loadAllRequest({
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: LeaveCancellationListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.leaveCancellationState.all;
    const { loadAllRequest } = props.leaveCancellationDispatch;

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
  handleOnBind: (props: LeaveCancellationListProps) => (item: ILeave, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.reason,
    tertiary: item.leave && item.leave.value || item.leaveType,
    quaternary: item.regular && item.regular.leave && item.regular.leave.name || 'N/A',
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: LeaveCancellationListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: LeaveCancellationListProps) => (filter: ILeaveCancellationListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: LeaveCancellationListProps) => () => {
    return props.employeeUid !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<LeaveCancellationListProps, IOwnState> = {
  componentDidUpdate(prevProps: LeaveCancellationListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        employeeUid: this.props.employeeUid,
      },
      {
        employeeUid: prevProps.employeeUid,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const LeaveCancellationList = compose<LeaveCancellationListProps, IOwnOption>(
  setDisplayName('LeaveCancellationList'),
  withUser,
  withLeaveCancellation,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LeaveCancellationListView);