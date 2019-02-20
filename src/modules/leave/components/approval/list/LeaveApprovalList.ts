import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILeaveApprovalGetAllFilter } from '@leave/classes/filters/approval';
import { ILeave } from '@leave/classes/response';
import { LeaveRequestField } from '@leave/classes/types';
import { WithLeaveApproval, withLeaveApproval } from '@leave/hoc/withLeaveApproval';
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

import { ILeaveApprovalListFilterResult } from './LeaveApprovalListFilter';
import { LeaveApprovalListView } from './LeaveApprovalListView';

interface IOwnOption {
  
}

interface IOwnState extends ILeaveApprovalListFilterResult {
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
  handleFilterApplied: (filter: ILeaveApprovalListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type LeaveApprovalListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLeaveApproval
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<LeaveApprovalListProps, IOwnState> = (props: LeaveApprovalListProps): IOwnState => {
  const { request } = props.leaveApprovalState.all;
  
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(LeaveRequestField).map(key => ({ 
      value: key, 
      name: LeaveRequestField[key] 
    }))
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.status = props.location.state.status;
    state.isNotify = props.location.state.isNotify;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.leaveType = request.filter.leaveType,
      state.statusType = request.filter.statusType,
      state.status = request.filter.status;
      state.isNotify = request.filter.isNotify;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<LeaveApprovalListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILeaveApprovalListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<LeaveApprovalListProps, IOwnHandler> = {
  handleOnLoadApi: (props: LeaveApprovalListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { user } = props.userState;
    const { isLoading, request } = props.leaveApprovalState.all;
    const { loadAllRequest } = props.leaveApprovalDispatch;

    if (user && !isLoading) {
      // predefined filter
      const filter: ILeaveApprovalGetAllFilter = {
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        leaveType: props.leaveType,
        statusType: props.statusType,
        status: props.status,
        isNotify: props.isNotify,
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
  handleOnLoadApiSearch: (props: LeaveApprovalListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.leaveApprovalState.all;
    const { loadAllRequest } = props.leaveApprovalDispatch;

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
  handleOnBind: (props: LeaveApprovalListProps) => (item: ILeave, index: number) => ({
    key: index,
        primary: item.uid,
        secondary: item.reason,
        tertiary: item.leave && item.leave.value || item.leaveType,
        quaternary: item.regular && item.regular.leave && item.regular.leave.name || 'N/A',
        quinary: item.status && item.status.value || item.statusType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: LeaveApprovalListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: LeaveApprovalListProps) => (filter: ILeaveApprovalListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: LeaveApprovalListProps) => () => {
    return props.customerUid !== undefined || 
      props.leaveType !== undefined || 
      props.statusType !== undefined || 
      props.status !== undefined || 
      props.isNotify === true;
  },
};

const lifecycles: ReactLifeCycleFunctions<LeaveApprovalListProps, IOwnState> = {
  componentDidUpdate(prevProps: LeaveApprovalListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUid: this.props.customerUid,
        leaveType: this.props.leaveType,
        statusType: this.props.statusType,
        status: this.props.status,
        isNotify: this.props.isNotify
      },
      {
        customerUid: prevProps.customerUid,
        leaveType: prevProps.leaveType,
        statusType: prevProps.statusType,
        status: prevProps.status,
        isNotify: prevProps.isNotify
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const LeaveApprovalList = compose<LeaveApprovalListProps, IOwnOption>(
  setDisplayName('LeaveApprovalList'),
  withUser,
  withLeaveApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LeaveApprovalListView);