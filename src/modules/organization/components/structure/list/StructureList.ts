import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { IStructure } from '@organization/classes/response/structure';
import { StructureField } from '@organization/classes/types';
import { WithOrganizationStructure, withOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
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
import { IOrganizationStructureAllFilter } from '@organization/classes/filters/structure';
import { IStructureListFilterResult } from './StructureListFilter';
import { StructureListView } from './StructureListView';

interface IOwnOption {

}

interface IOwnState extends IStructureListFilterResult {
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
  handleOnBind: (item: IStructure, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IStructureListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type StructureListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithOrganizationStructure
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<StructureListProps, IOwnState> = (props: StructureListProps): IOwnState => {
  const { request } = props.organizationStructureState.all;
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    // selected: [],
    fields: Object.keys(StructureField).map(key => ({
      value: key,
      name: StructureField[key]
    }))
  };
  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.companyUid = props.location.state.companyUid;
  } else {
    if (request && request.filter) {
      state.companyUid = request.filter.companyUid;
    }
  }
  return state;
};

const stateUpdaters: StateUpdaters<StructureListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: () => (filter: IStructureListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<StructureListProps, IOwnHandler> = {
  handleOnLoadApi: (props: StructureListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.organizationStructureState.all;
    const { loadAllRequest } = props.organizationStructureDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IOrganizationStructureAllFilter = {
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
      if (isExpired || shouldLoad || isRetry) {
        loadAllRequest({
          filter,
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: StructureListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.organizationStructureState.all;
    const { loadAllRequest } = props.organizationStructureDispatch;

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
        });
      }
    }
  },
  handleOnBind: (props: StructureListProps) => (item: IStructure, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.description || '-',
    tertiary: item.company && item.company.name || 'N/A',
    quaternary: item.inactiveDate && props.intl.formatDate(item.inactiveDate, GlobalFormat.Date) || 'N/A',
    quinary: item.changes && (item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName) || '?',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: StructureListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: StructureListProps) => (filter: IStructureListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: StructureListProps) => () => {
    return props.companyUid !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<StructureListProps, IOwnState> = {
  componentDidUpdate(prevProps: StructureListProps) {
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

export const StructureList = compose(
  setDisplayName('StructureList'),
  withUser,
  withOrganizationStructure,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(StructureListView);