import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { ILookupHolidayGetAllFilter } from '@lookup/classes/filters';
import { ILookupHoliday } from '@lookup/classes/response';
import { LookupHolidayField } from '@lookup/classes/types';
import { WithLookupHoliday, withLookupHoliday } from '@lookup/hoc/withLookupHoliday';
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

import { ILookupHolidayListFilterResult } from './LookupHolidayListFilter';
import { LookupHolidayListView } from './LookupHolidayListView';

interface IOwnOption {

}

interface IOwnState extends ILookupHolidayListFilterResult {
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
  handleOnBind: (item: ILookupHoliday, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ILookupHolidayListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type LookupHolidayListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupHoliday
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<LookupHolidayListProps, IOwnState> = (props: LookupHolidayListProps): IOwnState => {
  const { request } = props.lookupHolidayState.all;

  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(LookupHolidayField).map(key => ({
      value: key,
      name: LookupHolidayField[key]
    }))
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.companyUid = request.filter.companyUid;
  }

  return state;
};

const stateUpdaters: StateUpdaters<LookupHolidayListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILookupHolidayListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<LookupHolidayListProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupHolidayListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.lookupHolidayState.all;
    const { loadAllRequest } = props.lookupHolidayDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: ILookupHolidayGetAllFilter = {
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
  handleOnLoadApiSearch: (props: LookupHolidayListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.lookupHolidayState.all;
    const { loadAllRequest } = props.lookupHolidayDispatch;
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
  handleOnBind: (props: LookupHolidayListProps) => (item: ILookupHoliday, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.company ? item.company.name : 'N/A',
    tertiary: item.description ? item.description : 'N/A',
    quaternary: item.date && props.intl.formatDate(item.date, GlobalFormat.Date) || 'N/A',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || '?',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: LookupHolidayListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: LookupHolidayListProps) => (filter: ILookupHolidayListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: LookupHolidayListProps) => () => {
    return props.companyUid !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupHolidayListProps, IOwnState> = {
  componentDidUpdate(prevProps: LookupHolidayListProps) {
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

export const LookupHolidayList = compose(
  setDisplayName('LookupHolidayList'),
  withUser,
  withLookupHoliday,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(LookupHolidayListView);