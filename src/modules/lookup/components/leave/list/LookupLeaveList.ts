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

import { ILookupLeaveGetAllFilter } from '@lookup/classes/filters';
import { ILookupLeave } from '@lookup/classes/response';
import { LookupLeaveField } from '@lookup/classes/types';
import { WithLookupLeave, withLookupLeave } from '@lookup/hoc/withLookupLeave';
import { ILookupLeaveListFilterResult } from './LookupLeaveListFilter';
import { LookupLeaveListView } from './LookupLeaveListView';

interface IOwnOption {

}

interface IOwnState extends ILookupLeaveListFilterResult {
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
  handleOnBind: (item: ILookupLeave, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ILookupLeaveListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type LookupLeaveListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupLeave
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<LookupLeaveListProps, IOwnState> = (props: LookupLeaveListProps): IOwnState => {
  const { request } = props.lookupLeaveState.all;

  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(LookupLeaveField).map(key => ({
      value: key,
      name: LookupLeaveField[key]
    }))
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.companyUid = request.filter.companyUid;
  }

  return state;
};

const stateUpdaters: StateUpdaters<LookupLeaveListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILookupLeaveListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<LookupLeaveListProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupLeaveListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.lookupLeaveState.all;
    const { loadAllRequest } = props.lookupLeaveDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: ILookupLeaveGetAllFilter = {
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
  handleOnLoadApiSearch: (props: LookupLeaveListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.lookupLeaveState.all;
    const { loadAllRequest } = props.lookupLeaveDispatch;
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
  handleOnBind: (props: LookupLeaveListProps) => (item: ILookupLeave, index: number) => ({
    key: index,
    primary: item.year.toString(),
    secondary: item.category && item.category.value || 'N/A',
    tertiary: item.name,
    quaternary: item.allocation.toString(),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || '?',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: LookupLeaveListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: LookupLeaveListProps) => (filter: ILookupLeaveListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: LookupLeaveListProps) => () => {
    return props.companyUid !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupLeaveListProps, IOwnState> = {
  componentDidUpdate(prevProps: LookupLeaveListProps) {
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

export const LookupLeaveList = compose(
  setDisplayName('LookupLeaveList'),
  withUser,
  withLookupLeave,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(LookupLeaveListView);