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

import { IMileageApprovalGetAllFilter } from '@mileage/classes/filters';
import { IMileageRequest } from '@mileage/classes/response';
import { MileageRequestField } from '@mileage/classes/types';
import { withMileageApproval, WithMileageApproval } from '@mileage/hoc/withMileageApproval';
import { IMileageApprovalListFilterResult } from './MileageApprovalListFilter';
import { MileageApprovalListView } from './MileageApprovalListView';

interface IOwnOption {

}

interface IOwnState extends IMileageApprovalListFilterResult {
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
  handleOnBind: (item: IMileageRequest, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IMileageApprovalListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type MileageApprovalListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithMileageApproval
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<MileageApprovalListProps, IOwnState> = (props: MileageApprovalListProps): IOwnState => {
  const { request } = props.mileageApprovalState.all;

  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(MileageRequestField).map(key => ({
      value: key,
      name: MileageRequestField[key]
    }))
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.status = props.location.state.status;
    state.isNotify = props.location.state.isNotify;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.year = request.filter.year,
      state.month = request.filter.month,
      state.statusType = request.filter.statusType,
      state.status = request.filter.status,
      state.isNotify = request.filter.isNotify;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<MileageApprovalListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IMileageApprovalListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<MileageApprovalListProps, IOwnHandler> = {
  handleOnLoadApi: (props: MileageApprovalListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.mileageApprovalState.all;
    const { loadAllRequest } = props.mileageApprovalDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IMileageApprovalGetAllFilter = {
        month: request && request.filter ? request.filter.month : props.month,
        year: request && request.filter ? request.filter.year : props.year,
        statusType: request && request.filter ? request.filter.statusType : props.statusType,
        status: request && request.filter ? request.filter.status : props.status,
        isNotify : props.isNotify,
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
      if (isExpired || shouldLoad || isRetry) {
        loadAllRequest({
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: MileageApprovalListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.mileageApprovalState.all;
    const { loadAllRequest } = props.mileageApprovalDispatch;
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
  handleOnBind: (props: MileageApprovalListProps) => (item: IMileageRequest, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: props.intl.formatDate(new Date(item.year, item.month - 1), GlobalFormat.MonthYear),
    tertiary: item.employee && item.employee.fullName || item.employeeUid,
    quaternary: props.intl.formatNumber(item.amount, GlobalFormat.CurrencyDefault),
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'  
  }),
  handleFilterVisibility: (props: MileageApprovalListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: MileageApprovalListProps) => (filter: IMileageApprovalListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: MileageApprovalListProps) => () => {
    return props.year !== undefined ||
      props.month !== undefined ||
      props.statusType !== undefined ||
      props.status !== undefined ||
      props.isNotify === true;
  }
};

const lifecycles: ReactLifeCycleFunctions<MileageApprovalListProps, IOwnState> = {
  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.isReload) {
        this.props.handleOnLoadApi(undefined, true, true);
        this.props.location.state.isReload = false;
      }
    }
  },
  componentDidUpdate(prevProps: MileageApprovalListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        year: this.props.year,
        month: this.props.month,
        statusType: this.props.statusType,
        status: this.props.status,
        isNotify: this.props.isNotify
      },
      {
        year: prevProps.year,
        month: prevProps.month,
        statusType: prevProps.statusType,
        status: prevProps.status,
        isNotify: prevProps.isNotify
      }
    );

    if (isFilterChanged) {
        this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const MileageApprovalList = compose(
  setDisplayName('MileageApprovalList'),
  withUser,
  withMileageApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(MileageApprovalListView);