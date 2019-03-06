import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { IProjectRegistrationGetAllFilter } from '@project/classes/filters/registration';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationField } from '@project/classes/types';
import { WithAllowedProjectCreate, withAllowedProjectCreate } from '@project/hoc/withAllowedProjectCreate';
import { WithProjectAdministration, withProjectAdministration } from '@project/hoc/withProjectAdministration';
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

import { IProjectAdministrationListFilterResult } from './ProjectAdministrationFilter';
import { ProjectAdministrationListView } from './ProjectAdministrationListView';

interface IOwnOption {
  
}

interface IOwnState extends IProjectAdministrationListFilterResult {
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
  handleOnBind: (item: IProject, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IProjectAdministrationListFilterResult) => void;
  handleFilterBadge: () => boolean;
  // handleSelection: (values: string[]) => void;
  // handleDisableSelection: (item: IProject) => boolean;
}

export type ProjectAdministrationListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithProjectAdministration
  & WithAllowedProjectCreate
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<ProjectAdministrationListProps, IOwnState> = (props: ProjectAdministrationListProps): IOwnState => {
  const { request } = props.projectAdministrationState.all;
  
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    // selected: [],
    status: 'pending',
    fields: Object.keys(ProjectRegistrationField).map(key => ({ 
      value: key, 
      name: ProjectRegistrationField[key] 
    }))
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.isRejected = props.location.state.isRejected;
    state.isNewOwner = props.location.state.isNewOwner;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.customerUid = request.filter.customerUid,
      state.projectType = request.filter.projectType,
      state.statusType = request.filter.statusType,
      state.status = request.filter.status,
      state.isRejected = request.filter.isRejected;
      state.isNewOwner = request.filter.isNewOwner;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<ProjectAdministrationListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IProjectAdministrationListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
  // setSelection: (state: IOwnState) => (values?: string[]): Partial<IOwnState> => ({
  //   selected: values
  // }),
};

const handlerCreators: HandleCreators<ProjectAdministrationListProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectAdministrationListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.projectAdministrationState.all;
    const { loadAllRequest } = props.projectAdministrationDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IProjectRegistrationGetAllFilter = {
        customerUid: props.customerUid,
        projectType: props.projectType,
        statusType: props.statusType,
        status: props.status,
        isRejected: props.isRejected,
        isNewOwner: props.isNewOwner,
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
          filter,
          companyUid: props.userState.user.company.uid,
          positionUid: props.userState.user.position.uid
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: ProjectAdministrationListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.projectAdministrationState.all;
    const { loadAllRequest } = props.projectAdministrationDispatch;

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
          filter,
          companyUid: props.userState.user.company.uid,
          positionUid: props.userState.user.position.uid
        });
      }
    }
  },
  handleOnBind: (props: ProjectAdministrationListProps) => (item: IProject, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: item.project && item.project.value || item.projectType,
    quinary: item.valueIdr && props.intl.formatNumber(item.valueIdr, GlobalFormat.CurrencyDefault) || '-',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: ProjectAdministrationListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: ProjectAdministrationListProps) => (filter: IProjectAdministrationListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: ProjectAdministrationListProps) => () => {
    return props.customerUid !== undefined || 
      props.projectType !== undefined || 
      props.statusType !== undefined ||
      props.status !== 'pending' ||
      props.isRejected === true ||
      props.isNewOwner === true;
  },
  // handleSelection: (props: ProjectAdministrationListProps) => (values: string[]) => {
  //   console.log(values);
  // },
  // handleDisableSelection: (props: ProjectAdministrationListProps) => (item: IProject): boolean => {
  //   return item.statusType === 'SST03';
  // }
};

const lifecycles: ReactLifeCycleFunctions<ProjectAdministrationListProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectAdministrationListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUid: this.props.customerUid,
        projectType: this.props.projectType,
        statusType: this.props.statusType,
        status: this.props.status,
        isRejected: this.props.isRejected,
        isNewOwner: this.props.isNewOwner
      },
      {
        customerUid: prevProps.customerUid,
        projectType: prevProps.projectType,
        statusType: prevProps.statusType,
        status: prevProps.status,
        isRejected: prevProps.isRejected,
        isNewOwner: prevProps.isNewOwner
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const ProjectAdministrationList = compose(
  setDisplayName('ProjectAdministrationList'),
  withUser,
  withProjectAdministration,
  withAllowedProjectCreate,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ProjectAdministrationListView);