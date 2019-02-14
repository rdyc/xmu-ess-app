import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationField } from '@project/classes/types';
import { ProjectRegistrationSumarry } from '@project/components/registration/detail/shared/ProjectRegistrationSummary';
import { WithProjectApproval, withProjectApproval } from '@project/hoc/withProjectApproval';
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

import { IProjectApprovalListFilterResult, ProjectApprovalListFilter } from './ProjectApprovalListFilter';

interface IOwnOption {
  
}

interface IOwnState extends IProjectApprovalListFilterResult {
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
  handleFilterApplied: (filter: IProjectApprovalListFilterResult) => void;
}

type AllProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithProjectApproval
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage 
        config={props.config} 
        source={props.projectApprovalState.all} 
        loadDataWhen={props.shouldUpdate} 
      >
        <ProjectApprovalListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            customerUid: props.customerUid,
            projectType: props.projectType,
            statusType: props.statusType,
            status: props.status,
            isNotify: props.isNotify,
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => {
  const { request } = props.projectApprovalState.all;
  
  // default state
  const state: IOwnState = {
    shouldUpdate: false,
    isFilterOpen: false
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.status = props.location.state.isRejected;
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

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldUpdate: !state.shouldUpdate
  }),
  setConfig: (state: IOwnState) => (config: IListConfig<IProject>): Partial<IOwnState> => ({
    config
  }),
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IProjectApprovalListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IProjectApprovalListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.projectApprovalState.all;
    const { loadAllRequest } = this.props.projectApprovalDispatch;

    const config: IListConfig<IProject> = {
      // page
      page: {
        uid: AppMenu.ProjectRegistrationApproval,
        parentUid: AppMenu.ProjectRegistration,
        title: this.props.intl.formatMessage(projectMessage.approval.page.listTitle),
        description: this.props.intl.formatMessage(projectMessage.approval.page.listSubHeader),
      },
      
      // top bar
      fields: Object.keys(ProjectRegistrationField)
        .map(key => ({ 
          value: key, 
          name: ProjectRegistrationField[key] 
        })),
      // fieldTranslator: projectRegistrationFieldTranslator,
    
      // searching
      hasSearching: true,
      searchStatus: () => {
        let result: boolean = false;
    
        if (request && request.filter) {
          result = request.filter.find ? true : false;
        }
    
        return result;
      },
    
      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean, resetPage?: boolean) => {  
        // when user is set and not loading
        if (user && !isLoading) {
          // when request, response are empty and or force reloading
          if (!request || !response || forceReload) {
            loadAllRequest({
              filter: {
                companyUid: user.company.uid,
                positionUid: user.position.uid,
                customerUid: this.props.customerUid,
                projectType: this.props.projectType,
                statusType: this.props.statusType,
                status: this.props.status,
                isNotify: this.props.isNotify,
                find: params.find,
                findBy: params.findBy,
                orderBy: params.orderBy,
                direction: params.direction,
                page: resetPage ? 1 : params.page,
                size: params.size
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
          <Button 
            size="small"
            onClick={() => this.props.history.push(`/project/approvals/${item.uid}`)}
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
              this.props.isNotify === true;
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
      this.props.isNotify !== nextProps.isNotify
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const ProjectApprovalList = compose<AllProps, IOwnOption>(
  setDisplayName('ProjectApprovalList'),
  withUser,
  withProjectApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);