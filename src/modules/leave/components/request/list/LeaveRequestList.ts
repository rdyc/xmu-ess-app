import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILeaveRequestGetAllFilter } from '@leave/classes/filters/request';
import { ILeave } from '@leave/classes/response';
import { LeaveRequestField } from '@leave/classes/types';
import { WithLeaveRequest, withLeaveRequest } from '@leave/hoc/withLeaveRequest';
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

import { ILeaveRequestListFilterResult } from './LeaveRequestListFilter';
import { LeaveRequestListView } from './LeaveRequestListView';

interface IOwnOption {
  
}

interface IOwnState extends ILeaveRequestListFilterResult {
  fields: ICollectionValue[];
  isFilterOpen: boolean;
  // selected: string[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
  // setSelection: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: ILeave, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ILeaveRequestListFilterResult) => void;
  handleFilterBadge: () => boolean;
  // handleSelection: (values: string[]) => void;
  // handleDisableSelection: (item: ILeave) => boolean;
}

export type LeaveRequestListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLeaveRequest
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<LeaveRequestListProps, IOwnState> = (props: LeaveRequestListProps): IOwnState => {
  const { request } = props.leaveRequestState.all;
  
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    // selected: [],
    fields: Object.keys(LeaveRequestField).map(key => ({ 
      value: key, 
      name: LeaveRequestField[key] 
    }))
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.isRejected = props.location.state.isRejected;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.leaveType = request.filter.leaveType,
      state.statusType = request.filter.statusType,
      state.isRejected = request.filter.isRejected;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<LeaveRequestListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILeaveRequestListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
  // setSelection: (state: IOwnState) => (values?: string[]): Partial<IOwnState> => ({
  //   selected: values
  // }),
};

const handlerCreators: HandleCreators<LeaveRequestListProps, IOwnHandler> = {
  handleOnLoadApi: (props: LeaveRequestListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.leaveRequestState.all;
    const { loadAllRequest } = props.leaveRequestDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: ILeaveRequestGetAllFilter = {
        leaveType: props.leaveType,
        statusType: props.statusType,
        isRejected: props.isRejected,
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
          companyUid: props.userState.user.company.uid,
          positionUid: props.userState.user.position.uid
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: LeaveRequestListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.leaveRequestState.all;
    const { loadAllRequest } = props.leaveRequestDispatch;

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
          filter,
          companyUid: props.userState.user.company.uid,
          positionUid: props.userState.user.position.uid
        });
      }
    }
  },
  handleOnBind: (props: LeaveRequestListProps) => (item: ILeave, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.reason,
    tertiary: item.leave && item.leave.value || item.leaveType,
    quaternary: item.regular && item.regular.leave && item.regular.leave.name || 'Regular Type',
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: LeaveRequestListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: LeaveRequestListProps) => (filter: ILeaveRequestListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: LeaveRequestListProps) => () => {
    return props.leaveType !== undefined || 
      props.statusType !== undefined ||
      props.isRejected === true;
  },
};

const lifecycles: ReactLifeCycleFunctions<LeaveRequestListProps, IOwnState> = {
  componentDidUpdate(prevProps: LeaveRequestListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        leaveType: this.props.leaveType,
        statusType: this.props.statusType,
        isRejected: this.props.isRejected,
      },
      {
        leaveType: prevProps.leaveType,
        statusType: prevProps.statusType,
        isRejected: prevProps.isRejected,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const LeaveRequestList = compose(
  setDisplayName('LeaveRequestList'),
  withUser,
  withLeaveRequest,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(LeaveRequestListView);