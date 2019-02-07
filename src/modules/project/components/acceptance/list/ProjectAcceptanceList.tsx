import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import { IProjectAssignmentDetail } from '@project/classes/response';
import { ProjectAssignmentField } from '@project/classes/types';
import { WithProjectAcceptance, withProjectAcceptance } from '@project/hoc/withProjectAcceptance';
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

import { ProjectAcceptanceSummary } from '../detail/ProjectAcceptanceSummary';
import { IProjectAcceptanceListFilterResult, ProjectAcceptanceListFilter } from './ProjectAcceptanceListFilter';

interface IOwnOption {
  
}

interface IOwnState extends IProjectAcceptanceListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IProjectAssignmentDetail>;
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
  handleFilterApplied: (filter: IProjectAcceptanceListFilterResult) => void;
}

type AllProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithProjectAcceptance
  & InjectedIntlProps
  & RouteComponentProps;
  
const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage 
        config={props.config} 
        source={props.projectAcceptanceState.all} 
        loadDataWhen={props.shouldUpdate} 
      >
        <ProjectAcceptanceListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            customerUids: props.customerUids,
            projectTypes: props.projectTypes,
            statusTypes: props.statusTypes
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);
const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => {
  const { request } = props.projectAcceptanceState.all;
  
  // default state
  const state: IOwnState = {
    shouldUpdate: false,
    isFilterOpen: false
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.customerUids = request.filter.customerUids;
    state.projectTypes = request.filter.projectTypes;
    state.statusTypes = request.filter.statusTypes;
  }

  return state;
};

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldUpdate: !state.shouldUpdate
  }),
  setConfig: (state: IOwnState) => (config: IListConfig<IProjectAssignmentDetail>): Partial<IOwnState> => ({
    config
  }),
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IProjectAcceptanceListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IProjectAcceptanceListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.projectAcceptanceState.all;
    const { loadAllRequest } = this.props.projectAcceptanceDispatch;

    const config: IListConfig<IProjectAssignmentDetail> = {
      // page
      page: {
        uid: AppMenu.ProjectAssignmentAcceptance,
        parentUid: AppMenu.ProjectAssignment,
        title: this.props.intl.formatMessage(projectMessage.acceptance.page.listTitle),
        description : this.props.intl.formatMessage(projectMessage.acceptance.page.listSubHeader)
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
    
        if (request && request.filter) {
          result = request.filter.find ? true : false;
        }
    
        return result;
      },
    
      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean, resetPage?: boolean) => {
        // when user is set and not loading
        if (user && !isLoading) {
          // when response are empty or force reloading
          if (!response || forceReload) {
            loadAllRequest({
              filter: {
                customerUids: this.props.customerUids,
                projectTypes: this.props.projectTypes,
                statusTypes: this.props.statusTypes,
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
      onBind: (item: IProjectAssignmentDetail, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.projectUid,
        tertiary: item.name,
        quaternary: item.customer && item.customer.name || item.customerUid,
        // quinary: parseAcceptance(item.items, this.props.userState.user),
        quinary: item.project && item.project.value || item.projectType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: IProjectAssignmentDetail) => ( 
        <ProjectAcceptanceSummary data={item} />
      ),

      // action component
      actionComponent: (item: IProjectAssignmentDetail, callback: ListHandler) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => this.props.history.push(`/project/acceptances/${item.uid}`)}
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
              this.props.statusTypes !== undefined;
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
      this.props.statusTypes !== nextProps.statusTypes
    ) {
      this.props.setShouldUpdate();
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
)(listView);