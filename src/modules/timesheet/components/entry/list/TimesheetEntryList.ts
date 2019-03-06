import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { ITimesheetEntryGetAllFilter } from '@timesheet/classes/filters';
import { ITimesheet } from '@timesheet/classes/response';
import { TimesheetEntryField } from '@timesheet/classes/types';
import { WithTimesheetEntry, withTimesheetEntry } from '@timesheet/hoc/withTimesheetEntry';
import * as moment from 'moment';
import * as React from 'react';
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

import { ITimesheetEntryListFilterResult } from './TimesheetEntryListFilter';
import { TimesheetEntryListView } from './TimesheetEntryListView';

interface IOwnOption {

}

interface IOwnState extends ITimesheetEntryListFilterResult {
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
  handleOnBind: (item: ITimesheet, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ITimesheetEntryListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type TimesheetEntryListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithTimesheetEntry
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<TimesheetEntryListProps, IOwnState> = (props: TimesheetEntryListProps): IOwnState => {
  const { request } = props.timesheetEntryState.all;

  // default state
  const state: IOwnState = {
    status: 'pending',
    isFilterOpen: false,
    fields: Object.keys(TimesheetEntryField).map(key => ({
      value: key,
      name: TimesheetEntryField[key]
    }))
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.status = props.location.state.status;
    state.isRejected = props.location.state.isRejected;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.customerUid = request.filter.customerUid,
      state.activityType = request.filter.activityType,
      state.statusType = request.filter.statusType,
      state.status = request.filter.status,
      state.start = request.filter.start,
      state.end = request.filter.end,
      state.isRejected = request.filter.isRejected;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<TimesheetEntryListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ITimesheetEntryListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<TimesheetEntryListProps, IOwnHandler> = {
  handleOnLoadApi: (props: TimesheetEntryListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.timesheetEntryState.all;
    const { loadAllRequest } = props.timesheetEntryDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: ITimesheetEntryGetAllFilter = {
        isRejected: props.isRejected,
        companyUid: props.userState.user.company.uid,
        positionUid: props.positionUid,
        start: props.start,
        end: props.end,
        customerUid: props.customerUid,
        activityType: props.activityType,
        statusType: props.statusType,
        status: props.status,
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
  handleOnLoadApiSearch: (props: TimesheetEntryListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.timesheetEntryState.all;
    const { loadAllRequest } = props.timesheetEntryDispatch;

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
  handleOnBind: (props: TimesheetEntryListProps) => (item: ITimesheet, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: props.intl.formatDate(item.date, GlobalFormat.Date),
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: item.employee ? item.employee.fullName : 'N/A',
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: TimesheetEntryListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: TimesheetEntryListProps) => (filter: ITimesheetEntryListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: TimesheetEntryListProps) => () => {
    return props.customerUid !== undefined ||
      props.activityType !== undefined ||
      props.status !== 'pending' ||
      props.statusType !== undefined ||
      props.start !== undefined ||
      props.end !== undefined ||
      props.isRejected === true;
  },
};

const lifecycles: ReactLifeCycleFunctions<TimesheetEntryListProps, IOwnState> = {
  componentDidUpdate(prevProps: TimesheetEntryListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUid: this.props.customerUid,
        activityType: this.props.activityType,
        statusType: this.props.statusType,
        status: this.props.status,
        start: this.props.start,
        end: this.props.end,
        isRejected: this.props.isRejected,
      },
      {
        customerUid: prevProps.customerUid,
        activityType: prevProps.activityType,
        statusType: prevProps.statusType,
        status: prevProps.status,
        start: prevProps.start,
        end: prevProps.end,
        isRejected: prevProps.isRejected,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const TimesheetEntryList = compose(
  setDisplayName('TimesheetEntryList'),
  withUser,
  withTimesheetEntry,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(TimesheetEntryListView);