import { IFinance } from '@finance/classes/response';
import { FinanceField } from '@finance/classes/types';
import { WithFinanceApproval, withFinanceApproval } from '@finance/hoc/withFinanceApproval';
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

import { FinanceStatusType } from '@common/classes/types';
import { IFinanceApprovalGetAllFilter } from '@finance/classes/filters/approval';
import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IFinanceApprovalListFilterResult } from './FinanceApprovalListFilter';
import { FinanceApprovalListView } from './FinanceApprovalListView';

interface IOwnOption {
  
}

interface IOwnState extends IFinanceApprovalListFilterResult {
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
  handleOnBind: (item: IFinance, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IFinanceApprovalListFilterResult) => void;
  handleFilterBadge: () => boolean;
  handleSelection: (values: string[]) => void;
  handleDisableSelection: (item: IFinance) => boolean;
}

export type FinanceApprovalListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithFinanceApproval
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<FinanceApprovalListProps, IOwnState> = (props: FinanceApprovalListProps): IOwnState => {
  const { request } = props.financeApprovalState.all;

  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    selected: [],
    fields: Object.keys(FinanceField).map(key => ({ 
      value: key, 
      name: FinanceField[key] 
    }))
  };
  
  // fill from previous request if any
  if (request && request.filter) {
    state.moduleType = request.filter.moduleType,
    state.financeStatusTypes = request.filter.financeStatusTypes;
  }

  return state;
};

const stateUpdaters: StateUpdaters<FinanceApprovalListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: () => (filter: IFinanceApprovalListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
  setSelection: (state: IOwnState) => (values?: string[]): Partial<IOwnState> => ({
    selected: values
  }),
};

const handlerCreators: HandleCreators<FinanceApprovalListProps, IOwnHandler> = {
  handleOnLoadApi: (props: FinanceApprovalListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.financeApprovalState.all;
    const { loadAllRequest } = props.financeApprovalDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IFinanceApprovalGetAllFilter = {
        moduleType: props.moduleType,
        employeeName: undefined,
        start: undefined,
        end: undefined,
        financeStatusTypes: props.financeStatusTypes,
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
          positionUid: props.userState.user.position.uid,
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: FinanceApprovalListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.financeApprovalState.all;
    const { loadAllRequest } = props.financeApprovalDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter = {
        ...request && request.filter,
        find,
        findBy,
        page: undefined,
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
  handleOnBind: (props: FinanceApprovalListProps) => (item: IFinance, index: number) => ({
    key: index,
    primary: item.module && item.module.value || 'N/A',
    secondary:  item.document && item.document.changes && item.document.changes.created && item.document.changes.created.fullName || item.document &&  item.document.changes && item.document.changes.createdBy || 'N/A',
    tertiary: item.document && item.document.amount && item.document.amount.total && props.intl.formatNumber(item.document.amount.total, GlobalFormat.CurrencyDefault) || '0',
    quaternary: item.document && item.document.uid || 'N/A',
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: FinanceApprovalListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: FinanceApprovalListProps) => (filter: IFinanceApprovalListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: FinanceApprovalListProps) => () => {
    return props.moduleType !== undefined || 
      props.financeStatusTypes !== undefined;
  },
  handleSelection: (props: FinanceApprovalListProps) => (values: string[]) => {
    props.history.push('/finance/approvals/payment', {values});
  },
  handleDisableSelection: (props: FinanceApprovalListProps) => (item: IFinance): boolean => {
    const exceptions = [FinanceStatusType.NotPaid, FinanceStatusType.Paid];
    return exceptions.some(exception => item.statusType === exception);
  }
};

const lifecycles: ReactLifeCycleFunctions<FinanceApprovalListProps, IOwnState> = {
  componentDidUpdate(prevProps: FinanceApprovalListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        moduleType: this.props.moduleType,
        financeStatusTypes: this.props.financeStatusTypes,
      },
      {
        moduleType: prevProps.moduleType,
        financeStatusTypes: prevProps.financeStatusTypes,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const FinanceApprovalList = compose(
  setDisplayName('FinanceApprovalList'),
  withUser,
  withFinanceApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(FinanceApprovalListView);