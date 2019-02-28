import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProjectAssignmentGetAllFilter } from '@project/classes/filters/assignment';
import { IProjectAssignment } from '@project/classes/response';
import { ProjectAssignmentField } from '@project/classes/types';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
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

import { IProjectAssignmentListFilterResult } from './ProjectAssignmentListFilter';
import { ProjectAssignmentListView } from './ProjectAssingmentListView';

interface IOwnOption {
  
}

interface IOwnState extends IProjectAssignmentListFilterResult {
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
  handleOnBind: (item: IProjectAssignment, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IProjectAssignmentListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type ProjectAssignmentListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithProjectAssignment
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<ProjectAssignmentListProps, IOwnState> = (props: ProjectAssignmentListProps): IOwnState => {
  const { request } = props.projectAssignmentState.all;
  
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
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
  }

  return state;
};

const stateUpdaters: StateUpdaters<ProjectAssignmentListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IProjectAssignmentListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<ProjectAssignmentListProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectAssignmentListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.projectAssignmentState.all;
    const { loadAllRequest } = props.projectAssignmentDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IProjectAssignmentGetAllFilter = {
        customerUids: props.customerUids,
        projectTypes: props.projectTypes,
        statusTypes: props.statusTypes,
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
  handleOnLoadApiSearch: (props: ProjectAssignmentListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.projectAssignmentState.all;
    const { loadAllRequest } = props.projectAssignmentDispatch;

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
  handleOnBind: (props: ProjectAssignmentListProps) => (item: IProjectAssignment, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.projectUid,
    tertiary: item.name,
    quaternary: item.customer && item.customer.name || item.customerUid,
    quinary: item.project && item.project.value || item.projectType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: ProjectAssignmentListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: ProjectAssignmentListProps) => (filter: IProjectAssignmentListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: ProjectAssignmentListProps) => () => {
    return props.customerUids !== undefined || 
      props.projectTypes !== undefined || 
      props.statusTypes !== undefined;
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectAssignmentListProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectAssignmentListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUids: this.props.customerUids,
        projectTypes: this.props.projectTypes,
        statusTypes: this.props.statusTypes
      },
      {
        customerUids: prevProps.customerUids,
        projectTypes: prevProps.projectTypes,
        statusTypes: prevProps.statusTypes
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const ProjectAssignmentList = compose(
  setDisplayName('ProjectAssignmentList'),
  withUser,
  withProjectAssignment,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ProjectAssignmentListView);