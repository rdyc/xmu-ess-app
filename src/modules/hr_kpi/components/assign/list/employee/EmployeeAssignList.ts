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

import { AccountEmployeeField } from '@account/classes/types';
import { IEmployeeKPIGetAllFilter } from '@kpi/classes/filter';
import { IEmployeeKPI } from '@kpi/classes/response';
import { withEmployeeKPI, WithEmployeeKPI } from '@kpi/hoc/withEmployeeKPI';
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
  handleOnBind: (item: IEmployeeKPI, index: number) => IDataBindResult;
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
  & WithEmployeeKPI
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<AccountEmployeeAssignListProps, IOwnState> = (props: AccountEmployeeAssignListProps): IOwnState => {
  const { request } = props.employeeKPIState.all;
  
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
    state.companyUids = request.filter.companyUids,
    state.positionUids = request.filter.positionUids,
    state.useAccess = request.filter.useAccess,
    state.isFinal = request.filter.isFinal,
    state.year = request.filter.year,
    state.isNotAssigned = request.filter.isNotAssigned,
    // state.useSuperOrdinate = false,
    state.isActive = request.filter.isActive;
  } else {
    state.useAccess = false,
    state.isActive = true;
    // state.useSuperOrdinate = false;
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
    const { isExpired, isLoading, request } = props.employeeKPIState.all;
    const { loadAllRequest } = props.employeeKPIDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IEmployeeKPIGetAllFilter = {
        companyUids: props.companyUids,
        // positionUids: props.positionUids,
        useAccess: false,
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
        loadAllRequest({
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: AccountEmployeeAssignListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.employeeKPIState.all;
    const { loadAllRequest } = props.employeeKPIDispatch;

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
  handleOnBind: (props: AccountEmployeeAssignListProps) => (item: IEmployeeKPI, index: number) => ({
    key: index,
    primary: item.company ? item.company.name : 'N/A',
    secondary: item.fullName,
    tertiary: item.lastAssign && item.lastAssign.year.toString() || 'N/A',
    quaternary: item.lastAssign && (item.lastAssign.isFinal && 
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
    return props.companyUids !== undefined || 
      // props.positionUids !== undefined || 
      // props.useAccess === true || 
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
        companyUids: this.props.companyUids,
        // positionUids: this.props.positionUids,
        isActive: this.props.isActive,
        // useAccess: this.props.useAccess,
        isFinal: this.props.isFinal,
        isNotAssigned: this.props.isNotAssigned,
        year: this.props.year,
      },
      {
        companyUids: prevProps.companyUids,
        // positionUids: prevProps.positionUids,
        isActive: prevProps.isActive,
        // useAccess: prevProps.useAccess,
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
  withEmployeeKPI,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(EmployeeAssignListView);