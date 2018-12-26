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

// const parseAcceptance = (items: IProjectAssignmentDetailItem[] | null, user: IAppUser | undefined): string => {
//   if (user && items) {
//     // find any items with submitted status for current user uid
//     const pending = items.filter(item =>
//       item.employeeUid === user.uid &&
//       item.statusType === WorkflowStatusType.Submitted
//     );

//     return pending.length > 0 ? `Pending` : 'Complete';
//   } 
    
//   return '';
// };

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
            statusTypes: props.statusTypes,
            projectUid: props.projectUid,
            activeOnly: props.activeOnly
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
  activeOnly: props.location.state && props.location.state.activeOnly
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<IProjectAssignmentDetail>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: IProjectAcceptanceListFilterResult) => ({
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
    
        if (request && request.filter && request.filter.query && request.filter.query.find) {
          result = request.filter.query.find ? true : false;
        }
    
        return result;
      },

      // action centre
      showActionCentre: false,
    
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
                activeOnly: this.props.activeOnly,
                query: {
                  find: params.find,
                  findBy: params.findBy,
                  orderBy: params.orderBy,
                  direction: params.direction,
                  page: params.page,
                  size: params.size
                }
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
              this.props.statusTypes !== undefined || 
              this.props.projectUid !== undefined ||
              this.props.activeOnly === true;
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
      this.props.projectUid !== nextProps.projectUid ||
      this.props.activeOnly !== nextProps.activeOnly
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