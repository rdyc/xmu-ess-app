import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProjectAcceptanceGetAllFilter } from '@project/classes/filters/acceptance';
import { IProjectAssignmentDetail } from '@project/classes/response';
import { ProjectAssignmentField } from '@project/classes/types';
import { WithProjectAcceptance, withProjectAcceptance } from '@project/hoc/withProjectAcceptance';
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

import { IProjectAcceptanceListFilterResult } from './ProjectAcceptanceListFilter';
import { ProjectAcceptanceListView } from './ProjectAcceptanceListView';

interface IOwnOption {
  
}

interface IOwnState extends IProjectAcceptanceListFilterResult {
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
  handleOnBind: (item: IProjectAssignmentDetail, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IProjectAcceptanceListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type ProjectAcceptanceListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithProjectAcceptance
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<ProjectAcceptanceListProps, IOwnState> = (props: ProjectAcceptanceListProps): IOwnState => {
  const { request } = props.projectAcceptanceState.all;
  
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    // status: 'pending',
    fields: Object.keys(ProjectAssignmentField).map(key => ({ 
      value: key, 
      name: ProjectAssignmentField[key] 
    }))
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.customerUids = request.filter.customerUids;
    state.projectTypes = request.filter.projectTypes;
    state.statusTypes = request.filter.statusTypes;
    state.status = request.filter.status;
  }

  return state;
};

const stateUpdaters: StateUpdaters<ProjectAcceptanceListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IProjectAcceptanceListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<ProjectAcceptanceListProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectAcceptanceListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.projectAcceptanceState.all;
    const { loadAllRequest } = props.projectAcceptanceDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IProjectAcceptanceGetAllFilter = {
        customerUids: props.customerUids,
        projectTypes: props.projectTypes,
        statusTypes: props.statusTypes,
        // status: props.status,
        projectUid: request && request.filter && request.filter.projectUid,
        activeOnly: request && request.filter && request.filter.activeOnly,
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
  handleOnLoadApiSearch: (props: ProjectAcceptanceListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.projectAcceptanceState.all;
    const { loadAllRequest } = props.projectAcceptanceDispatch;

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
  handleOnBind: (props: ProjectAcceptanceListProps) => (item: IProjectAssignmentDetail, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.projectUid,
    tertiary: item.name,
    quaternary: item.customer && item.customer.name || item.customerUid,
    // quinary: parseAcceptance(item.items, this.props.userState.user),
    quinary: item.project && item.project.value || item.projectType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: ProjectAcceptanceListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: ProjectAcceptanceListProps) => (filter: IProjectAcceptanceListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: ProjectAcceptanceListProps) => () => {
    return props.customerUids !== undefined || 
      props.projectTypes !== undefined || 
      props.statusTypes !== undefined;
      // props.status !== 'pending';
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectAcceptanceListProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectAcceptanceListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUids: this.props.customerUids,
        projectTypes: this.props.projectTypes,
        statusTypes: this.props.statusTypes,
        // status: this.props.status,
      },
      {
        customerUids: prevProps.customerUids,
        projectTypes: prevProps.projectTypes,
        statusTypes: prevProps.statusTypes,
        // status: prevProps.status,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const ProjectAcceptanceList = compose(
  setDisplayName('ProjectAcceptanceList'),
  withUser,
  withProjectAcceptance,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ProjectAcceptanceListView);