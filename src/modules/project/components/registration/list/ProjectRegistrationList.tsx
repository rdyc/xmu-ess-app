import AppMenu from '@constants/AppMenu';
import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { CollectionPage, IDataBindResult, IListConfig } from '@layout/components/pages';
import { IDataControl } from '@layout/components/pages/dataContainer/DataContainer';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarControl } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TuneIcon from '@material-ui/icons/Tune';
import { isRequestEditable } from '@organization/helper/isRequestEditable';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationField } from '@project/classes/types';
import { ProjectRegistrationSumarry } from '@project/components/registration/detail/shared/ProjectRegistrationSummary';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as moment from 'moment';
import * as React from 'react';
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

import { IProjectRegistrationListFilterResult, ProjectRegistrationListFilter } from './ProjectRegistrationListFilter';

interface IOwnOption {
  
}

interface IOwnState extends IProjectRegistrationListFilterResult {
  fields: ICollectionValue[];
  dataControls?: IDataControl[];
  toolbarControls?: IAppBarControl[];
  config?: IListConfig<IProject>;
  isFilterOpen: boolean;
  isModeSearch: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setConfig: StateHandler<IOwnState>;
  setDataControls: StateHandler<IOwnState>;
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean) => void;
  handleOnBind: (item: IProject, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IProjectRegistrationListFilterResult) => void;
}

type AllProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithProjectRegistration
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    <CollectionPage
      info={{
        uid: AppMenu.ProjectRegistrationRequest,
        parentUid: AppMenu.ProjectRegistration,
        title: props.intl.formatMessage(projectMessage.registration.page.listTitle),
        description: props.intl.formatMessage(projectMessage.registration.page.listSubHeader)
      }}
      state={props.projectRegisterState.all}
      hasSearching={true}
      isModeSearch={props.isModeSearch}
      fields={props.fields}
      dataControls={props.dataControls}
      toolbarControls={props.toolbarControls}
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      summaryComponent={(item: IProject) => ( 
        <ProjectRegistrationSumarry data={item} />
      )}
      actionComponent={(item: IProject) => (
        <React.Fragment>
          {
            isRequestEditable(item.statusType) &&
            <Button 
              size="small"
              onClick={() => props.history.push(`/project/requests/form`, { uid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button 
            size="small"
            onClick={() => props.history.push(`/project/requests/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
    />

    <ProjectRegistrationListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        projectType: props.projectType,
        statusType: props.statusType,
        isRejected: props.isRejected,
        isNewOwner: props.isNewOwner
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => {
  const { request } = props.projectRegisterState.all;
  
  // default state
  const state: IOwnState = {
    isModeSearch: request && request.filter && request.filter.find !== undefined || false,
    isFilterOpen: false,
    fields: Object.keys(ProjectRegistrationField).map(key => ({ 
      value: key, 
      name: ProjectRegistrationField[key] 
    })),
    toolbarControls: [
      {
        icon: AddCircleIcon,
        onClick: () => { 
          props.history.push('/project/requests/form'); 
        }
      }
    ]
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
      state.isRejected = request.filter.isRejected;
      state.isNewOwner = request.filter.isNewOwner;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setDataControls: (state: IOwnState) => (controls: IDataControl[]): Partial<IOwnState> => ({
    dataControls: controls
  }),
  setConfig: (state: IOwnState) => (config: IListConfig<IProject>): Partial<IOwnState> => ({
    config
  }),
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IProjectRegistrationListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleOnLoadApi: (props: AllProps) => (params?: IBasePagingFilter, resetPage?: boolean) => {
    const { isLoading, request } = props.projectRegisterState.all;
    const { loadAllRequest } = props.projectRegisterDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter = {
        customerUid: props.customerUid,
        projectType: props.projectType,
        statusType: props.statusType,
        isRejected: props.isRejected,
        isNewOwner: props.isNewOwner,
        find: params && params.find || request && request.filter && request.filter.find,
        findBy: params && params.findBy || request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage && 1 || params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
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
  handleOnBind: (props: AllProps) => (item: IProject, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: item.project && item.project.value || item.projectType,
    quinary: item.valueIdr && props.intl.formatNumber(item.valueIdr, GlobalFormat.CurrencyDefault) || '-',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IProjectRegistrationListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const dataControls = [
      {
        id: 'option-filter',
        title: this.props.intl.formatMessage(layoutMessage.tooltip.filter),
        icon: TuneIcon,
        showBadgeWhen: () => {
          return this.props.customerUid !== undefined || 
            this.props.projectType !== undefined || 
            this.props.statusType !== undefined ||
            this.props.isRejected === true ||
            this.props.isNewOwner === true;
        },
        onClick: this.props.handleFilterVisibility
      }
    ];

    this.props.setDataControls(dataControls);
  },
  componentDidUpdate(nextProps: AllProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        customerUid: this.props.customerUid,
        projectType: this.props.projectType,
        statusType: this.props.statusType,
        isRejected: this.props.isRejected,
        isNewOwner: this.props.isNewOwner
      },
      {
        customerUid: nextProps.customerUid,
        projectType: nextProps.projectType,
        statusType: nextProps.statusType,
        isRejected: nextProps.isRejected,
        isNewOwner: nextProps.isNewOwner
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const ProjectRegistrationList = compose(
  setDisplayName('ProjectRegistrationList'),
  withUser,
  withProjectRegistration,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);