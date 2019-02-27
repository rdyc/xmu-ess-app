import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupRoleGetAllFilter } from '@lookup/classes/filters/role';
import { IRole } from '@lookup/classes/response';
import { RoleField } from '@lookup/classes/types';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
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
import { ILookupRoleListFilterResult } from './LookupRoleListFilter';
import { LookupRoleListView } from './LookupRoleListView';

interface IOwnOption {

}

interface IOwnState extends ILookupRoleListFilterResult {
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
  handleOnBind: (item: IRole, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ILookupRoleListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type LookupRoleListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupRole
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<LookupRoleListProps, IOwnState> = (props: LookupRoleListProps): IOwnState => {
  const { request } = props.lookupRoleState.all;

  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(RoleField).map(key => ({
      value: key,
      name: RoleField[key]
    }))
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.companyUid = request.filter.companyUid;
  }

  return state;
};

const stateUpdaters: StateUpdaters<LookupRoleListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILookupRoleListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<LookupRoleListProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupRoleListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.lookupRoleState.all;
    const { loadAllRequest } = props.lookupRoleDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: ILookupRoleGetAllFilter = {
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
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: LookupRoleListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.lookupRoleState.all;
    const { loadAllRequest } = props.lookupRoleDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
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
  handleOnBind: (props: LookupRoleListProps) => (item: IRole, index: number) => ({
    key: index,
        primary: item.uid,
        secondary: item.name,
        tertiary: item.company ? item.company.name : 'N/A',
        quaternary: item.description ? item.description : 'N/A',
        quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: LookupRoleListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: LookupRoleListProps) => (filter: ILookupRoleListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: LookupRoleListProps) => () => {
    return props.companyUid !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupRoleListProps, IOwnState> = {
  componentDidUpdate(prevProps: LookupRoleListProps) {
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

export const LookupRoleList = compose(
  setDisplayName('LookupRoleList'),
  withUser,
  withLookupRole,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(LookupRoleListView);