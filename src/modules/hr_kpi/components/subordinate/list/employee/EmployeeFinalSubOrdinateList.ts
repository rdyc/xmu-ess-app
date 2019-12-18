import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
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

import { IEmployeeAllKPIFinalFilter } from '@account/classes/filters/employeeKPIFinal';
import { IEmployeeKPIFinal } from '@account/classes/response/employeeKPIFinal';
import { AccountEmployeeField } from '@account/classes/types';
import { WithOrganizationStructure, withOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
import { IAccountEmployeeFilterResult } from './EmployeeFinalSubOrdinateFilter';
import { EmployeeFinalSubOrdinateListView } from './EmployeeFinalSubOrdinateListView';

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
  handleOnBind: (item: IEmployeeKPIFinal, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IAccountEmployeeFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type AccountEmployeeFinalSubOrdinateListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithOrganizationStructure
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<AccountEmployeeFinalSubOrdinateListProps, IOwnState> = (props: AccountEmployeeFinalSubOrdinateListProps): IOwnState => {
  const { request } = props.organizationStructureState.subOrdinateTreeKPIFinal;
  
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
    state.isActive = request.filter.isActive;
  } else {
    state.isActive = true;
  }

  return state;
};

const stateUpdaters: StateUpdaters<AccountEmployeeFinalSubOrdinateListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IAccountEmployeeFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<AccountEmployeeFinalSubOrdinateListProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeFinalSubOrdinateListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.organizationStructureState.subOrdinateTreeKPIFinal;
    const { loadSubOrdinateTreeKPIFinalRequest } = props.organizationStructureDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IEmployeeAllKPIFinalFilter = {
        isActive: props.isActive,
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
        loadSubOrdinateTreeKPIFinalRequest({
          filter,
          companyUid: props.userState.user.company.uid,
          positionUid: props.userState.user.position.uid,
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: AccountEmployeeFinalSubOrdinateListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.organizationStructureState.subOrdinateTreeKPIFinal;
    const { loadSubOrdinateTreeKPIFinalRequest } = props.organizationStructureDispatch;

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
        loadSubOrdinateTreeKPIFinalRequest({
          filter,
          companyUid: props.userState.user.company.uid,
          positionUid: props.userState.user.position.uid,
        });
      }
    }
  },
  handleOnBind: (props: AccountEmployeeFinalSubOrdinateListProps) => (item: IEmployeeKPIFinal, index: number) => ({
    key: index,
    primary: item.company ? item.company.name : 'N/A',
    secondary: item.fullName,
    tertiary: item.lastKPIFinal && item.lastKPIFinal.year.toString() || 'N/A',
    quaternary: props.intl.formatDate(item.joinDate, GlobalFormat.Date),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: AccountEmployeeFinalSubOrdinateListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AccountEmployeeFinalSubOrdinateListProps) => (filter: IAccountEmployeeFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: AccountEmployeeFinalSubOrdinateListProps) => () => {
    return props.companyUid !== undefined || 
      props.isActive === false;
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeFinalSubOrdinateListProps, IOwnState> = {
  componentDidUpdate(prevProps: AccountEmployeeFinalSubOrdinateListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        companyUid: this.props.companyUid,
        isActive: this.props.isActive,
      },
      {
        companyUid: prevProps.companyUid,
        isActive: prevProps.isActive,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const EmployeeFinalSubOrdinateList = compose(
  setDisplayName('EmployeeFinalSubOrdinateList'),
  withUser,
  withOrganizationStructure,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(EmployeeFinalSubOrdinateListView);