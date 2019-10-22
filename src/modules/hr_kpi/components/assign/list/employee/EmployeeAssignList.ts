import { IBasePagingFilter } from '@generic/interfaces';
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

import { IEmployeeAllKPIAssignFilter } from '@account/classes/filters/employeeKPI';
import { IEmployeeKPIAssign } from '@account/classes/response/employeeKPI';
import { AccountEmployeeField } from '@account/classes/types';
import { WithAccountEmployeeKPI, withAccountEmployeeKPI } from '@account/hoc/withAccountEmployeeKPI';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { IAccountEmployeeFilterResult } from './EmployeeAssignFilter';
import { EmployeeAssignListView } from './EmployeeAssignListView';

interface IOwnOption {
  
}

interface IOwnState extends IAccountEmployeeFilterResult {
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
  handleOnBind: (item: IEmployeeKPIAssign, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IAccountEmployeeFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type AccountEmployeeAssignListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithAccountEmployeeKPI
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<AccountEmployeeAssignListProps, IOwnState> = (props: AccountEmployeeAssignListProps): IOwnState => {
  const { request } = props.accountEmployeeKPIState.allAssign;
  
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(AccountEmployeeField).map(key => ({ 
      value: key, 
      name: AccountEmployeeField[key] 
    }))
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.companyUid = request.filter.companyUid,
    state.isFinal = request.filter.isFinal,
    state.year = request.filter.year,
    state.isNotAssigned = request.filter.isNotAssigned,
    state.isActive = request.filter.isActive;
  } else {
    state.isActive = true;
  }

  return state;
};

const stateUpdaters: StateUpdaters<AccountEmployeeAssignListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: () => (filter: IAccountEmployeeFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<AccountEmployeeAssignListProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeAssignListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.accountEmployeeKPIState.allAssign;
    const { loadAllAssignRequest } = props.accountEmployeeKPIDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IEmployeeAllKPIAssignFilter = {
        companyUid: props.companyUid,
        isActive: props.isActive,
        isFinal: props.isFinal,
        isNotAssigned: props.isNotAssigned,
        year: props.year,
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
        loadAllAssignRequest({
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: AccountEmployeeAssignListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.accountEmployeeKPIState.allAssign;
    const { loadAllAssignRequest } = props.accountEmployeeKPIDispatch;

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
        loadAllAssignRequest({
          filter
        });
      }
    }
  },
  handleOnBind: (props: AccountEmployeeAssignListProps) => (item: IEmployeeKPIAssign, index: number) => ({
    key: index,
    primary: item.company ? item.company.name : 'N/A',
    secondary: item.fullName,
    tertiary: item.lastKPIAssign && item.lastKPIAssign.year.toString() || 'N/A',
    quaternary: item.lastKPIAssign && (item.lastKPIAssign.isFinal && 
      props.intl.formatMessage(kpiMessage.employee.field.isFinalTrue) ||
      props.intl.formatMessage(kpiMessage.employee.field.isFinalFalse)) || 'N/A',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: AccountEmployeeAssignListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AccountEmployeeAssignListProps) => (filter: IAccountEmployeeFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: AccountEmployeeAssignListProps) => () => {
    return props.companyUid !== undefined || 
      props.isActive === true ||
      props.isFinal !== undefined ||
      props.isNotAssigned !== undefined ||
      props.year !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAssignListProps, IOwnState> = {
  componentDidUpdate(prevProps: AccountEmployeeAssignListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        companyUid: this.props.companyUid,
        isActive: this.props.isActive,
        isFinal: this.props.isFinal,
        isNotAssigned: this.props.isNotAssigned,
        year: this.props.year,
      },
      {
        companyUid: prevProps.companyUid,
        isActive: prevProps.isActive,
        isFinal: prevProps.isFinal,
        isNotAssigned: prevProps.isNotAssigned,
        year: prevProps.year,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const EmployeeAssignList = compose(
  setDisplayName('EmployeeAssignList'),
  withUser,
  withAccountEmployeeKPI,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(EmployeeAssignListView);