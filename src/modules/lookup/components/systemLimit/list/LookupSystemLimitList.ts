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

import { ISystemLimitAllFilter } from '@lookup/classes/filters';
import { ISystemLimit } from '@lookup/classes/response';
import { SystemLimitField } from '@lookup/classes/types';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
import { ILookupSystemLimitFilterResult } from './LookupSystemLimitFilter';
import { LookupSystemLimitListView } from './LookupSystemLimitListView';

interface IOwnOption {

}

interface IOwnState extends ILookupSystemLimitFilterResult {
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
  handleOnBind: (item: ISystemLimit, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ILookupSystemLimitFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type LookupSystemLimitListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupSystemLimit
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<LookupSystemLimitListProps, IOwnState> = (props: LookupSystemLimitListProps): IOwnState => {
  const { request } = props.systemLimitState.all;

  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(SystemLimitField).map(key => ({
      value: key,
      name: SystemLimitField[key]
    }))
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.categoryType = request.filter.categoryType,
    state.companyUid = request.filter.companyUid;
  }

  return state;
};

const stateUpdaters: StateUpdaters<LookupSystemLimitListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILookupSystemLimitFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<LookupSystemLimitListProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupSystemLimitListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.systemLimitState.all;
    const { loadAllRequest } = props.systemLimitDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: ISystemLimitAllFilter = {
        companyUid: props.companyUid,
        categoryType: props.categoryType,
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
  handleOnLoadApiSearch: (props: LookupSystemLimitListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.systemLimitState.all;
    const { loadAllRequest } = props.systemLimitDispatch;
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
  handleOnBind: (props: LookupSystemLimitListProps) => (item: ISystemLimit, index: number) => ({
    key: index,
    primary: item.company && item.company.name || 'N/A',
    secondary: item.category ? item.category.value : 'N/A',
    tertiary: item.days.toString(),
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: LookupSystemLimitListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: LookupSystemLimitListProps) => (filter: ILookupSystemLimitFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: LookupSystemLimitListProps) => () => {
    return props.companyUid !== undefined ||
      props.categoryType !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupSystemLimitListProps, IOwnState> = {
  componentDidUpdate(prevProps: LookupSystemLimitListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        companyUid: this.props.companyUid,
        categoryType: this.props.categoryType,
      },
      {
        companyUid: prevProps.companyUid,
        categoryType: prevProps.categoryType
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const LookupSystemLimitList = compose(
  setDisplayName('LookupSystemLimitList'),
  withUser,
  withLookupSystemLimit,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(LookupSystemLimitListView);