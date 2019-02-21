import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { IHierarchy } from '@organization/classes/response/hierarchy';
import { HierarchyField } from '@organization/classes/types';
import { WithOrganizationHierarchy, withOrganizationHierarchy } from '@organization/hoc/withOrganizationHierarchy';
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

import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IOrganizationHierarchyAllFilter } from '@organization/classes/filters/hierarchy';
import { IOrganizationHierarchyListFilterResult } from './OrganizationHierarchyListFilter';
import { OrganizationHierarchyListView } from './OrganizationHierarchyListView';

interface IOwnOption {
  
}

interface IOwnState extends IOrganizationHierarchyListFilterResult {
  fields: ICollectionValue[];
  isFilterOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IHierarchy, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IOrganizationHierarchyListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type OrganizationHierarchyListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithOrganizationHierarchy
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<OrganizationHierarchyListProps, IOwnState> = (props: OrganizationHierarchyListProps): IOwnState => {
  const { request } = props.organizationHierarchyState.all;
  
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(HierarchyField).map(key => ({ 
      value: key, 
      name: HierarchyField[key] 
    }))
  };
  
  // fill from previous request if any
  if (request && request.filter) {
    state.companyUid = request.filter.companyUid;
  }

  return state;
};

const stateUpdaters: StateUpdaters<OrganizationHierarchyListProps, IOwnState, IOwnStateUpdater> = {
  
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: () => (filter: IOrganizationHierarchyListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<OrganizationHierarchyListProps, IOwnHandler> = {
  handleOnLoadApi: (props: OrganizationHierarchyListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isLoading, request } = props.organizationHierarchyState.all;
    const { loadAllRequest } = props.organizationHierarchyDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IOrganizationHierarchyAllFilter = {
        companyUid: props.companyUid,
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
          filter,
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: OrganizationHierarchyListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.organizationHierarchyState.all;
    const { loadAllRequest } = props.organizationHierarchyDispatch;

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
          filter
        });
      }
    }
  },
  handleOnBind: (props: OrganizationHierarchyListProps) => (item: IHierarchy) => ({
    key: item.uid,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.company && item.company.name || 'N/A',
    quaternary: item.inactiveDate && props.intl.formatDate(item.inactiveDate, GlobalFormat.Date) || 'N/A',
    quinary: item.changes && (item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName) || '?',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: OrganizationHierarchyListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: OrganizationHierarchyListProps) => (filter: IOrganizationHierarchyListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: OrganizationHierarchyListProps) => () => {
    return props.companyUid !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<OrganizationHierarchyListProps, IOwnState> = {
  componentDidUpdate(prevProps: OrganizationHierarchyListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        companyUid: this.props.companyUid,
      },
      {
        companyUid: prevProps.companyUid,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const OrganizationHierarchyList = compose(
  setDisplayName('OrganizationHierarchyList'),
  withUser,
  withOrganizationHierarchy,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(OrganizationHierarchyListView);