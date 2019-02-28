import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { ITravelSettlementGetAllFilter } from '@travel/classes/filters';
import { ITravelSettlement } from '@travel/classes/response';
import { TravelRequestField } from '@travel/classes/types';
import { WithTravelSettlement, withTravelSettlement } from '@travel/hoc/withTravelSettlement';
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
import { ITravelSettlementListFilterResult } from './TravelSettlementListFilter';
import { TravelSettlementListView } from './TravelSettlementListView';

interface IOwnOption {
  
}

interface IOwnState extends ITravelSettlementListFilterResult {
  fields: ICollectionValue[];
  isFilterOpen: boolean;
  // selected: string[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
  // setSelection: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: ITravelSettlement, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ITravelSettlementListFilterResult) => void;
  handleFilterBadge: () => boolean;
  // handleSelection: (values: string[]) => void;
  // handleDisableSelection: (item: IProject) => boolean;
}

export type TravelSettlementListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithTravelSettlement
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<TravelSettlementListProps, IOwnState> = (props: TravelSettlementListProps): IOwnState => {
  const { request } = props.travelSettlementState.all;
  
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    // selected: [],
    status: 'pending',
    fields: Object.keys(TravelRequestField).map(key => ({ 
      value: key, 
      name: TravelRequestField[key] 
    }))
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.isRejected = props.location.state.isRejected;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.customerUid = request.filter.customerUid,
      state.statusType = request.filter.statusType,
      state.isRejected = request.filter.isRejected;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<TravelSettlementListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ITravelSettlementListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
  // setSelection: (state: IOwnState) => (values?: string[]): Partial<IOwnState> => ({
  //   selected: values
  // }),
};

const handlerCreators: HandleCreators<TravelSettlementListProps, IOwnHandler> = {
  handleOnLoadApi: (props: TravelSettlementListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.travelSettlementState.all;
    const { loadAllRequest } = props.travelSettlementDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: ITravelSettlementGetAllFilter = {
        customerUid: props.customerUid,
        statusType: props.statusType,
        status: props.status,
        isRejected: props.isRejected,
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
  handleOnLoadApiSearch: (props: TravelSettlementListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.travelSettlementState.all;
    const { loadAllRequest } = props.travelSettlementDispatch;

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
  handleOnBind: (props: TravelSettlementListProps) => (item: ITravelSettlement, index: number) => ({
    key: index,
        primary: item.uid,
        secondary: item.projectUid,
        tertiary: item.customer && item.customer.name || item.customerUid,
        quaternary: props.intl.formatNumber(item.total, GlobalFormat.CurrencyDefault) || '-',
        quinary: item.status && item.status.value || item.statusType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: TravelSettlementListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: TravelSettlementListProps) => (filter: ITravelSettlementListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: TravelSettlementListProps) => () => {
    return props.customerUid !== undefined ||
      props.statusType !== undefined ||
      props.isRejected === true;
  },
  // handleSelection: (props: ProjectRegistrationListProps) => (values: string[]) => {
  //   console.log(values);
  // },
  // handleDisableSelection: (props: ProjectRegistrationListProps) => (item: IProject): boolean => {
  //   return item.statusType === 'SST03';
  // }
};

const lifecycles: ReactLifeCycleFunctions<TravelSettlementListProps, IOwnState> = {
  componentDidUpdate(prevProps: TravelSettlementListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUid: this.props.customerUid,
        statusType: this.props.statusType,
        status: this.props.status,
        isRejected: this.props.isRejected
      },
      {
        customerUid: prevProps.customerUid,
        statusType: prevProps.statusType,
        status: prevProps.status,
        isRejected: prevProps.isRejected
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const TravelSettlementList = compose(
  setDisplayName('TravelSettlementList'),
  withUser,
  withTravelSettlement,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(TravelSettlementListView);