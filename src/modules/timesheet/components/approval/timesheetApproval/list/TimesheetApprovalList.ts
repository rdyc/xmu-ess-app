import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { ITimesheetApprovalGetAllFilter } from '@timesheet/classes/filters';
import { ITimesheet } from '@timesheet/classes/response';
import { TimesheetEntryField } from '@timesheet/classes/types';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
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

import { ITimesheetApprovalListFilterResult } from './TimesheetApprovalListFilter';
import { TimesheetApprovalListView } from './TimesheetApprovalListView';

interface IOwnOption {

}

interface IOwnState extends ITimesheetApprovalListFilterResult {
  fields: ICollectionValue[];
  isFilterOpen: boolean;
  selected: string[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
  setSelection: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: ITimesheet, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ITimesheetApprovalListFilterResult) => void;
  handleFilterBadge: () => boolean;
  handleSelection: (values: string[]) => void;
}

export type TimesheetApprovalListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithTimesheetApproval
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<TimesheetApprovalListProps, IOwnState> = (props: TimesheetApprovalListProps): IOwnState => {
  const { request } = props.timesheetApprovalState.all;

  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    selected: [],
    fields: Object.keys(TimesheetEntryField).map(key => ({
      value: key,
      name: TimesheetEntryField[key]
    }))
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.status = props.location.state.status;
    state.isNotify = props.location.state.isNotify;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.customerUid = request.filter.customerUid,
      state.activityType = request.filter.activityType,
      state.statusType = request.filter.statusType,
      state.status = request.filter.status,
      state.isNotify = request.filter.isNotify;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<TimesheetApprovalListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ITimesheetApprovalListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
  setSelection: (state: IOwnState) => (values?: string[]): Partial<IOwnState> => ({
    selected: values
  }),
};

const handlerCreators: HandleCreators<TimesheetApprovalListProps, IOwnHandler> = {
  handleOnLoadApi: (props: TimesheetApprovalListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { user } = props.userState;
    const { isLoading, request } = props.timesheetApprovalState.all;
    const { loadAllRequest } = props.timesheetApprovalDispatch;

    if (user && !isLoading) {
      // predefined filter
      const filter: ITimesheetApprovalGetAllFilter = {
        companyUid: props.companyUid,
        customerUid: props.customerUid,
        activityType: props.activityType,
        statusType: props.statusType,
        status: 'pending',
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
  handleOnLoadApiSearch: (props: TimesheetApprovalListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.timesheetApprovalState.all;
    const { loadAllRequest } = props.timesheetApprovalDispatch;

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
  handleOnBind: (props: TimesheetApprovalListProps) => (item: ITimesheet, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: props.intl.formatDate(item.date, GlobalFormat.Date),
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: item.employee ? item.employee.fullName : 'N/A',
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: TimesheetApprovalListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: TimesheetApprovalListProps) => (filter: ITimesheetApprovalListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: TimesheetApprovalListProps) => () => {
    return props.customerUid !== undefined ||
      props.activityType !== undefined ||
      props.statusType !== undefined ||
      props.status !== undefined ||
      props.isNotify === true;
  },
  handleSelection: (props: TimesheetApprovalListProps) => (values: string[]) => {
    props.history.push('/timesheet/approvals/action', {values});
  }
};

const lifecycles: ReactLifeCycleFunctions<TimesheetApprovalListProps, IOwnState> = {
  componentDidUpdate(prevProps: TimesheetApprovalListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUid: this.props.customerUid,
        activityType: this.props.activityType,
        statusType: this.props.statusType,
        status: this.props.status,
        isNotify: this.props.isNotify
      },
      {
        customerUid: prevProps.customerUid,
        activityType: prevProps.activityType,
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

export const TimesheetApprovalList = compose<TimesheetApprovalListProps, IOwnOption>(
  setDisplayName('TimesheetApprovalList'),
  withUser,
  withTimesheetApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(TimesheetApprovalListView);