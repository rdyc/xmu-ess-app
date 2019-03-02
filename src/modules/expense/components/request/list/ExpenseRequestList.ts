import { IExpense } from '@expense/classes/response';
import { ExpenseField } from '@expense/classes/types';
import { WithExpenseRequest, withExpenseRequest } from '@expense/hoc/withExpenseRequest';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
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

import { IExpenseRequestGetAllFilter } from '@expense/classes/filters/request';
import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IExpenseRequestListFilterResult } from './ExpenseRequestListFilter';
import { ExpenseRequestListView } from './ExpenseRequestListView';

interface IOwnOption {
  
}

interface IOwnState extends IExpenseRequestListFilterResult {
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
  handleOnBind: (item: IExpense, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IExpenseRequestListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type ExpenseRequestListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithExpenseRequest
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<ExpenseRequestListProps, IOwnState> = (props: ExpenseRequestListProps): IOwnState => {
  const { request } = props.expenseRequestState.all;

  const state: IOwnState = {
    isFilterOpen: false,
    status: 'pending',
    fields: Object.keys(ExpenseField).map(key => ({ 
      value: key, 
      name: ExpenseField[key] 
    }))
  };

  if (props.location.state) {
    state.isRejected = props.location.state.isRejected;
  } else {
    if (request && request.filter) {
      state.customerUid = request.filter.customerUid,
      // state.projectUid = request.filter.projectUid,
      state.expenseType = request.filter.expenseType,
      state.statusType = request.filter.statusType,
      state.start = request.filter.start,
      state.end = request.filter.end,
      state.status = request.filter.status,
      state.isRejected = request.filter.isRejected;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<ExpenseRequestListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: () => (filter: IExpenseRequestListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<ExpenseRequestListProps, IOwnHandler> = {
  handleOnLoadApi: (props: ExpenseRequestListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.expenseRequestState.all;
    const { loadAllRequest } = props.expenseRequestDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IExpenseRequestGetAllFilter = {
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        customerUid: props.customerUid,
        expenseType: props.expenseType,
        start: props.start,
        end: props.end,
        statusType: props.statusType,
        status: props.status,
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
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: ExpenseRequestListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.expenseRequestState.all;
    const { loadAllRequest } = props.expenseRequestDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter = {
        ...request && request.filter,
        find,
        findBy,
        page: undefined,
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid
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
  handleOnBind: (props: ExpenseRequestListProps) => (item: IExpense, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.notes && item.notes || '',
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: props.intl.formatNumber(item.value, GlobalFormat.CurrencyDefault),
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: ExpenseRequestListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: ExpenseRequestListProps) => (filter: IExpenseRequestListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: ExpenseRequestListProps) => () => {
    return props.customerUid !== undefined ||
      props.statusType !== undefined || 
      props.expenseType !== undefined ||
      props.start !== undefined ||
      props.end !== undefined ||
      props.status !== 'pending' || 
      props.isRejected === true;
  },
};

const lifecycles: ReactLifeCycleFunctions<ExpenseRequestListProps, IOwnState> = {
  componentDidUpdate(prevProps: ExpenseRequestListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUid: this.props.customerUid,
        expenseType: this.props.expenseType,
        start: this.props.start,
        end: this.props.end,
        statusType: this.props.statusType,
        status: this.props.status,
        isRejected: this.props.isRejected,
      },
      {
        customerUid: prevProps.customerUid,
        expenseType: prevProps.expenseType,
        start: prevProps.start,
        end: prevProps.end,
        statusType: prevProps.statusType,
        status: prevProps.status,
        isRejected: prevProps.isRejected,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const ExpenseRequestList = compose(
  setDisplayName('ExpenseRequestList'),
  withUser,
  withExpenseRequest,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ExpenseRequestListView);