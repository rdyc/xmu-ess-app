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

import { IMileageRequestGetAllFilter } from '@mileage/classes/filters';
import { IMileageRequest } from '@mileage/classes/response';
import { MileageRequestField } from '@mileage/classes/types';
import { WithMileageRequest, withMileageRequest } from '@mileage/hoc/withMileageRequest';
import { IMileageRequestListFilterResult } from './MileageRequestListFilter';
import { MileageRequestListView } from './MileageRequestListView';

interface IOwnOption {

}

interface IOwnState extends IMileageRequestListFilterResult {
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
  handleOnBind: (item: IMileageRequest, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IMileageRequestListFilterResult) => void;
  handleFilterBadge: () => boolean;
  // handleSelection: (values: string[]) => void;
  // handleDisableSelection: (item: IProject) => boolean;
}

export type MileageRequestListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithMileageRequest
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<MileageRequestListProps, IOwnState> = (props: MileageRequestListProps): IOwnState => {
  const { request } = props.mileageRequestState.all;

  const state: IOwnState = {
    isFilterOpen: false,
    // selected: [],
    fields: Object.keys(MileageRequestField).map(key => ({
      value: key,
      name: MileageRequestField[key]
    }))
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.isRejected = props.location.state.isRejected;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.year = request.filter.year,
      state.month = request.filter.month,
      state.statusType = request.filter.statusType,
      state.isRejected = request.filter.isRejected;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<MileageRequestListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IMileageRequestListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
  // setSelection: (state: IOwnState) => (values?: string[]): Partial<IOwnState> => ({
  //   selected: values
  // }),
};

const handlerCreators: HandleCreators<MileageRequestListProps, IOwnHandler> = {
  handleOnLoadApi: (props: MileageRequestListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isLoading, request } = props.mileageRequestState.all;
    const { loadAllRequest } = props.mileageRequestDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IMileageRequestGetAllFilter = {
        month: props.month,
        year: props.year,
        statusType: props.statusType,
        status: props.status,
        isRejected : props.isRejected,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
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
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: MileageRequestListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.mileageRequestState.all;
    const { loadAllRequest } = props.mileageRequestDispatch;
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
  handleOnBind: (props: MileageRequestListProps) => (item: IMileageRequest, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: props.intl.formatDate(new Date(item.year, item.month - 1), GlobalFormat.MonthYear),
    tertiary: item.employee && item.employee.fullName || item.employeeUid,
    quaternary: props.intl.formatNumber(item.amount, GlobalFormat.CurrencyDefault),
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    

  }),
  handleFilterVisibility: (props: MileageRequestListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: MileageRequestListProps) => (filter: IMileageRequestListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: MileageRequestListProps) => () => {
    return props.year !== undefined ||
      props.month !== undefined ||
      props.statusType !== undefined ||
      props.status !== undefined ||
      props.isRejected === true;
  },
  // handleSelection: (props: MileageRequestListProps) => (values: string[]) => {
  //   console.log(values);
  // },
  // handleDisableSelection: (props: MileageRequestListProps) => (item: IProject): boolean => {
  //   return item.statusType === 'SST03';
  // }
};

const lifecycles: ReactLifeCycleFunctions<MileageRequestListProps, IOwnState> = {
  componentDidUpdate(prevProps: MileageRequestListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        year: this.props.year,
        month: this.props.month,
        statusType: this.props.statusType,
        status: this.props.status,
        isRejected: this.props.isRejected
      },
      {
        year: prevProps.year,
        month: prevProps.month,
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

export const MileageRequestList = compose(
  setDisplayName('MileageRequestList'),
  withUser,
  withMileageRequest,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(MileageRequestListView);