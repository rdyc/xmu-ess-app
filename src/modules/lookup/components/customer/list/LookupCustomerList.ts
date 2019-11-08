import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCustomerGetAllFilter } from '@lookup/classes/filters/customer';
import { ICustomer } from '@lookup/classes/response';
import { LookupCustomerField } from '@lookup/classes/types/customer/LookupCustomerField';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
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
import { ILookupCustomerListFilterResult } from './LookupCustomerListFilter';
import { LookupCustomerListView } from './LookupCustomerListView';

interface IOwnOption {

}

interface IOwnState extends ILookupCustomerListFilterResult {
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
  handleOnBind: (item: ICustomer, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ILookupCustomerListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type LookupCustomerListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupCustomer
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<LookupCustomerListProps, IOwnState> = (props: LookupCustomerListProps): IOwnState => {
  const { request } = props.lookupCustomerState.all;

  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    // selected: [],
    fields: Object.keys(LookupCustomerField).map(key => ({
      value: key,
      name: LookupCustomerField[key]
    }))
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.companyUid = request.filter.companyUid;
  }

  return state;
};

const stateUpdaters: StateUpdaters<LookupCustomerListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILookupCustomerListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
  // setSelection: (state: IOwnState) => (values?: string[]): Partial<IOwnState> => ({
  //   selected: values
  // }),
};

const handlerCreators: HandleCreators<LookupCustomerListProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupCustomerListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.lookupCustomerState.all;
    const { loadAllRequest } = props.lookupCustomerDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: ILookupCustomerGetAllFilter = {
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
  handleOnLoadApiSearch: (props: LookupCustomerListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.lookupCustomerState.all;
    const { loadAllRequest } = props.lookupCustomerDispatch;

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
  handleOnBind: (props: LookupCustomerListProps) => (item: ICustomer, index: number) => ({
    key: index,
    primary: item.name,
    secondary: item.company && item.company.name || item.companyUid,
    tertiary: item.email ? item.email : 'N/A',
    quaternary: item.phone ? item.phone : (item.phoneAdditional ? item.phoneAdditional : 'N/A'),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: LookupCustomerListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: LookupCustomerListProps) => (filter: ILookupCustomerListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: LookupCustomerListProps) => () => {
    return props.companyUid !== undefined;
  },
  // handleSelection: (props: ProjectRegistrationListProps) => (values: string[]) => {
  //   console.log(values);
  // },
  // handleDisableSelection: (props: ProjectRegistrationListProps) => (item: IProject): boolean => {
  //   return item.statusType === 'SST03';
  // }
};

const lifecycles: ReactLifeCycleFunctions<LookupCustomerListProps, IOwnState> = {
  componentDidUpdate(prevProps: LookupCustomerListProps) {
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

export const LookupCustomerList = compose<LookupCustomerListProps, IOwnOption>(
  setDisplayName('LookupCustomerList'),
  withUser,
  withLookupCustomer,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LookupCustomerListView);