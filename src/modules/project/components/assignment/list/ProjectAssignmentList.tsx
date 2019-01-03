import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TuneIcon from '@material-ui/icons/Tune';
import { isRequestEditable } from '@organization/helper/isRequestEditable';
import { IProject, IProjectAssignment } from '@project/classes/response';
import { ProjectAssignmentField } from '@project/classes/types';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
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

import { ProjectAssignmentSummary } from '../detail/shared/ProjectAssignmentSummary';
import { IProjectAssignmentListFilterResult, ProjectAssignmentListFilter } from './ProjectAssignmentListFilter';

interface IOwnOption {
  
}

interface IOwnState extends IProjectAssignmentListFilterResult {
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
  handleFilterApplied: (filter: IProjectAssignmentListFilterResult) => void;
}

type AllProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithProjectAssignment
  & InjectedIntlProps
  & RouteComponentProps;
  
const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage 
        config={props.config} 
        source={props.projectAssignmentState.all} 
        loadDataWhen={props.shouldUpdate} 
      >
        <ProjectAssignmentListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            customerUids: props.customerUids,
            projectTypes: props.projectTypes,
            statusTypes: props.statusTypes,
            projectUid: props.projectUid
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
  isFilterOpen: false
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
  setFilterApplied: (prevState: IOwnState) => (filter: IProjectAssignmentListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IProjectAssignmentListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.projectAssignmentState.all;
    const { loadAllRequest } = this.props.projectAssignmentDispatch;

    const config: IListConfig<IProjectAssignment> = {
      // page
      page: {
        uid: AppMenu.ProjectAssignmentRequest,
        parentUid: AppMenu.ProjectAssignment,
        title: this.props.intl.formatMessage(projectMessage.assignment.page.listTitle),
        description : this.props.intl.formatMessage(projectMessage.assignment.page.listSubHeader)
      },
      
      // top bar
      fields: Object.keys(ProjectAssignmentField)
        .map(key => ({ 
          value: key, 
          name: ProjectAssignmentField[key] 
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
            this.props.history.push('/project/assignments/form'); 
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
              filter: {
                customerUids: this.props.customerUids,
                projectTypes: this.props.projectTypes,
                statusTypes: this.props.statusTypes,
                projectUid: this.props.projectUid,
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
      onBind: (item: IProjectAssignment, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.projectUid,
        tertiary: item.name,
        quaternary: item.customer && item.customer.name || item.customerUid,
        quinary: item.project && item.project.value || item.projectType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: IProjectAssignment) => ( 
        <ProjectAssignmentSummary data={item} />
      ),

      // action component
      actionComponent: (item: IProjectAssignment, callback: ListHandler) => (
        <React.Fragment>
          {
            isRequestEditable(item.statusType) &&
            <Button 
              size="small"
              onClick={() => this.props.history.push('/project/assignments/form', { 
                companyUid: item.customer && item.customer.companyUid, 
                assignmentUid: item.uid 
              })}
            >
              <FormattedMessage {...layoutMessage.action.modify}/>
            </Button>
          }

          <Button 
            size="small"
            onClick={() => this.props.history.push(`/project/assignments/${item.uid}`)}
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
            return this.props.customerUids !== undefined || 
              this.props.projectTypes !== undefined || 
              this.props.statusTypes !== undefined || 
              this.props.projectUid !== undefined;
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
      this.props.customerUids !== nextProps.customerUids ||
      this.props.projectTypes !== nextProps.projectTypes ||
      this.props.statusTypes !== nextProps.statusTypes ||
      this.props.projectUid !== nextProps.projectUid
    ) {
      this.props.setShouldUpdate();
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
)(listView);