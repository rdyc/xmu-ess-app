import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { ITravelRequest } from '@travel/classes/response';
import { TravelRequestField } from '@travel/classes/types';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
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
import { ITravelRequestListFilterResult } from './TravelRequestListFilter';
import { TravelRequestListView } from './TravelRequestListView';

interface IOwnOption {

}

interface IOwnState extends ITravelRequestListFilterResult {
  fields: ICollectionValue[];
  isFilterOpen: boolean;
  selected: string[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
  setSelection: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: ITravelRequest, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ITravelRequestListFilterResult) => void;
  handleFilterBadge: () => boolean;
  // handleSelection: (values: string[]) => void;
  // handleDisableSelection: (item: IProject) => boolean;
}

export type TravelRequestListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithTravelRequest
  & InjectedIntlProps
  & RouteComponentProps
  & WithStyles<typeof styles>;

const createProps: mapper<TravelRequestListProps, IOwnState> = (props: TravelRequestListProps): IOwnState => {
  const { request } = props.travelRequestState.all;

  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    status: 'pending',
    selected: [],
    fields: Object.keys(TravelRequestField).map(key => ({
      value: key,
      name: TravelRequestField[key]
    }))
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.isRejected = props.location.state.isRejected;
    state.isSettlement = props.location.state.isSettlement;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.customerUid = request.filter.customerUid,
      state.statusType = request.filter.statusType,
      state.status = request.filter.status,
      state.isRejected = request.filter.isRejected;
      state.isSettlement = request.filter.isSettlement;
    }
  }
  return state;
};

const stateUpdaters: StateUpdaters<TravelRequestListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ITravelRequestListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
  setSelection: (state: IOwnState) => (values?: string[]): Partial<IOwnState> => ({
    selected: values
  }),
};

const handlerCreators: HandleCreators<TravelRequestListProps, IOwnHandler> = {
  handleOnLoadApi: (props: TravelRequestListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.travelRequestState.all;
    const { loadAllRequest } = props.travelRequestDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter = {
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        customerUid: props.customerUid,
        statusType: props.statusType,
        status: props.status,
        isRejected: props.isRejected,
        isSettlement: props.isSettlement,
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
  handleOnLoadApiSearch: (props: TravelRequestListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.travelRequestState.all;
    const { loadAllRequest } = props.travelRequestDispatch;

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
  handleOnBind: (props: TravelRequestListProps) => (item: ITravelRequest, index: number) => ({
    key: index,
        primary: item.uid,
        secondary: item.projectUid,
        tertiary: item.customer && item.customer.name || item.customerUid,
        quaternary: item.total && props.intl.formatNumber(item.total, GlobalFormat.CurrencyDefault) || '-',
        quinary: item.status && item.status.value || item.statusType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: TravelRequestListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: TravelRequestListProps) => (filter: ITravelRequestListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: TravelRequestListProps) => () => {
    return props.customerUid !== undefined ||
      props.statusType !== undefined ||
      props.status !== 'pending' ||
      props.isRejected === true ||
      props.isSettlement === true;
  },
  // handleSelection: (props: ProjectRegistrationListProps) => (values: string[]) => {
  //   console.log(values);
  // },
  // handleDisableSelection: (props: ProjectRegistrationListProps) => (item: IProject): boolean => {
  //   return item.statusType === 'SST03';
  // }
};

const lifecycles: ReactLifeCycleFunctions<TravelRequestListProps, IOwnState> = {
  componentDidUpdate(nextProps: TravelRequestListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUid: this.props.customerUid,
        statusType: this.props.statusType,
        status: this.props.status,
        isRejected: this.props.isRejected,
        isSettlement: this.props.isSettlement
      },
      {
        customerUid: nextProps.customerUid,
        statusType: nextProps.statusType,
        status: nextProps.status,
        isRejected: nextProps.isRejected,
        isSettlement: nextProps.isSettlement
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const TravelRequestList = compose(
  setDisplayName('TravelRequestList'),
  withUser,
  withTravelRequest,
  withRouter,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(TravelRequestListView);