import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { IProjectApprovalGetAllFilter } from '@project/classes/filters/approval';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationField } from '@project/classes/types';
import { WithProjectApproval, withProjectApproval } from '@project/hoc/withProjectApproval';
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

import { IProjectApprovalListFilterResult } from './ProjectApprovalListFilter';
import { ProjectApprovalListView } from './ProjectApprovalListView';

interface IOwnOption {
  
}

interface IOwnState extends IProjectApprovalListFilterResult {
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
  handleOnBind: (item: IProject, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IProjectApprovalListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type ProjectApprovalListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithProjectApproval
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<ProjectApprovalListProps, IOwnState> = (props: ProjectApprovalListProps): IOwnState => {
  const { request } = props.projectApprovalState.all;
  
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(ProjectRegistrationField).map(key => ({ 
      value: key, 
      name: ProjectRegistrationField[key] 
    }))
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.status = props.location.state.status;
    state.isNotify = props.location.state.isNotify;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.customerUid = request.filter.customerUid,
      state.projectType = request.filter.projectType,
      state.statusType = request.filter.statusType,
      state.status = request.filter.status;
      state.isNotify = request.filter.isNotify;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<ProjectApprovalListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IProjectApprovalListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<ProjectApprovalListProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectApprovalListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { user } = props.userState;
    const { isExpired, isLoading, request } = props.projectApprovalState.all;
    const { loadAllRequest } = props.projectApprovalDispatch;

    if (user && !isLoading) {
      // predefined filter
      const filter: IProjectApprovalGetAllFilter = {
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        customerUid: props.customerUid,
        projectType: props.projectType,
        statusType: props.statusType,
        status: props.status,
        isNotify: props.isNotify,
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
  handleOnLoadApiSearch: (props: ProjectApprovalListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.projectApprovalState.all;
    const { loadAllRequest } = props.projectApprovalDispatch;

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
  handleOnBind: (props: ProjectApprovalListProps) => (item: IProject, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: item.project && item.project.value || item.projectType,
    quinary: item.valueIdr && props.intl.formatNumber(item.valueIdr, GlobalFormat.CurrencyDefault) || '-',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: ProjectApprovalListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: ProjectApprovalListProps) => (filter: IProjectApprovalListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: ProjectApprovalListProps) => () => {
    return props.customerUid !== undefined || 
      props.projectType !== undefined || 
      props.statusType !== undefined || 
      props.status !== undefined || 
      props.isNotify === true;
  },
};

const lifecycles: ReactLifeCycleFunctions<ProjectApprovalListProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectApprovalListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUid: this.props.customerUid,
        projectType: this.props.projectType,
        statusType: this.props.statusType,
        status: this.props.status,
        isNotify: this.props.isNotify
      },
      {
        customerUid: prevProps.customerUid,
        projectType: prevProps.projectType,
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

export const ProjectApprovalList = compose<ProjectApprovalListProps, IOwnOption>(
  setDisplayName('ProjectApprovalList'),
  withUser,
  withProjectApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ProjectApprovalListView);