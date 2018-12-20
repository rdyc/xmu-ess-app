import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
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
  shouldUpdate: boolean;
  config?: IListConfig<IProject>;
  isFilterOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setConfig: StateHandler<IOwnState>;
  setShouldUpdate: StateHandler<IOwnState>;
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
}

interface IOwnHandler {
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
    {
      props.config &&
      <ListPage 
        config={props.config} 
        source={props.projectRegisterState.all} 
        loadDataWhen={props.shouldUpdate} 
      >
        <ProjectRegistrationListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            customerUid: props.customerUid,
            projectType: props.projectType,
            statusType: props.statusType,
            status: props.status,
            isRejected: props.isRejected,
            isNewOwner: props.isNewOwner
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  shouldUpdate: false,
  isFilterOpen: false,

  // fill partial props from location state to handle redirection from dashboard notif
  isRejected: props.location.state && props.location.state.isRejected, 
  isNewOwner: props.location.state && props.location.state.isNewOwner 
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<IProject>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: IProjectRegistrationListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IProjectRegistrationListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.projectRegisterState.all;
    const { loadAllRequest } = this.props.projectRegisterDispatch;

    const config: IListConfig<IProject> = {
      // page
      page: {
        uid: AppMenu.ProjectRegistrationRequest,
        parentUid: AppMenu.ProjectRegistration,
        title: this.props.intl.formatMessage(projectMessage.registration.page.listTitle),
        description: this.props.intl.formatMessage(projectMessage.registration.page.listSubHeader)
      },
      
      // top bar
      fields: Object.keys(ProjectRegistrationField)
        .map(key => ({ 
          value: key, 
          name: ProjectRegistrationField[key] 
        })),
    
      // searching
      hasSearching: true,
      searchStatus: (): boolean => {
        let result: boolean = false;
    
        if (request && request.filter && request.filter.find) {
          result = request.filter.find ? true : false;
        }
    
        return result;
      },

      // action centre
      showActionCentre: false,

      // toolbar controls
      toolbarControls: (callback: ListHandler) => [
        {
          icon: AddCircleIcon,
          onClick: () => { 
            this.props.history.push('/project/requests/form'); 
          }
        }
      ],
    
      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean | false) => {
        // when user is set and not loading
        if (user && !isLoading) {
          // when response are empty or force reloading
          if (!response || forceReload) {
            loadAllRequest({
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              filter: {
                customerUid: this.props.customerUid,
                projectType: this.props.projectType,
                statusType: this.props.statusType,
                status: this.props.status,
                isRejected: this.props.isRejected,
                isNewOwner: this.props.isNewOwner,
                find: params.find,
                findBy: params.findBy,
                orderBy: params.orderBy,
                direction: params.direction,
                page: params.page,
                size: params.size,
              }
            });
          } else {
            // just take data from previous response
            callback.handleResponse(response);
          }
        }
      },
      onBind: (item: IProject, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.name,
        tertiary: item.customer && item.customer.name || item.customerUid,
        quaternary: item.project && item.project.value || item.projectType,
        quinary: item.valueIdr && this.props.intl.formatNumber(item.valueIdr, GlobalFormat.CurrencyDefault) || '-',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: IProject) => ( 
        <ProjectRegistrationSumarry data={item} />
      ),

      // action component
      actionComponent: (item: IProject, callback: ListHandler) => (
        <React.Fragment>
          {
            isRequestEditable(item.statusType) &&
            <Button 
              size="small"
              onClick={() => this.props.history.push(`/project/requests/form`, { uid: item.uid })}
            >
              <FormattedMessage {...layoutMessage.action.modify}/>
            </Button>
          }

          <Button 
            size="small"
            onClick={() => this.props.history.push(`/project/requests/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details}/>
          </Button>
        </React.Fragment>
      ),

      // additional controls
      additionalControls: [
        {
          id: 'option-filter',
          title: this.props.intl.formatMessage(layoutMessage.tooltip.filter),
          icon: TuneIcon,
          showBadgeWhen: () => {
            return this.props.customerUid !== undefined || 
              this.props.projectType !== undefined || 
              this.props.statusType !== undefined || 
              this.props.status !== undefined || 
              this.props.isRejected === true ||
              this.props.isNewOwner === true;
          },
          onClick: this.props.handleFilterVisibility
        }
      ]
    };

    this.props.setConfig(config);
  },
  componentDidUpdate(nextProps: AllProps) {
    // track any changes in filter props
    if (
      this.props.customerUid !== nextProps.customerUid ||
      this.props.projectType !== nextProps.projectType ||
      this.props.statusType !== nextProps.statusType ||
      this.props.status !== nextProps.status ||
      this.props.isRejected !== nextProps.isRejected ||
      this.props.isNewOwner !== nextProps.isNewOwner
    ) {
      this.props.setShouldUpdate();
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