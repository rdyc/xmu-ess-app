import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILeave } from '@leave/classes/response';
import { LeaveRequestField } from '@leave/classes/types';
import { LeaveSummary } from '@leave/components/request/detail/shared/LeaveSummary';
import { WithLeaveApproval, withLeaveApproval } from '@leave/hoc/withLeaveApproval';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { Button } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
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

import { ILeaveApprovalListFilterResult, LeaveApprovalListFilter } from './LeaveApprovalListFilter';

interface IOwnOption {
  
}

interface IOwnState extends ILeaveApprovalListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<ILeave>;
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
  handleFilterApplied: (filter: ILeaveApprovalListFilterResult) => void;
}

type AllProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLeaveApproval
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  shouldUpdate: false,
  isFilterOpen: false,

  // fill partial props from location state to handle redirection from dashboard notif
  status: props.location.state && props.location.state.status,
  isNotify: props.location.state && props.location.state.isNotify 
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<ILeave>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: ILeaveApprovalListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ILeaveApprovalListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.leaveApprovalState.all;
    const { loadAllRequest } = this.props.leaveApprovalDispatch;

    const config: IListConfig<ILeave> = {
      // page
      page: {
        uid: AppMenu.LeaveApproval,
        parentUid: AppMenu.LeaveRequest,
        title: this.props.intl.formatMessage(leaveMessage.approval.page.listTitle),
        description: this.props.intl.formatMessage(leaveMessage.approval.page.listSubHeader),
      },
      
      // top bar
      fields: Object.keys(LeaveRequestField)
        .map(key => ({ 
          value: key, 
          name: LeaveRequestField[key] 
        })),
      // fieldTranslator: leaveRequestFieldTranslator,
    
      // searching
      hasSearching: true,
      searchStatus: () => {
        let result: boolean = false;
    
        if (request && request.filter && request.filter.find) {
          result = request.filter.find ? true : false;
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
                companyUid: user.company.uid,
                positionUid: user.position.uid,
                leaveType: this.props.leaveType,
                statusType: this.props.statusType,
                status: this.props.status,
                isNotify: this.props.isNotify,
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
      onBind: (item: ILeave, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.reason,
        tertiary: item.leave && item.leave.value || item.leaveType,
        quaternary: item.regular && item.regular.leave && item.regular.leave.name || 'N/A',
        quinary: item.status && item.status.value || item.statusType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),
    
      // summary component
      summaryComponent: (item: ILeave) => ( 
        <LeaveSummary data={item} />
      ),
    
      // action component
      actionComponent: (item: ILeave, callback: ListHandler) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => this.props.history.push(`/leave/approvals/${item.uid}`)}
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
            return this.props.leaveType !== undefined || 
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
      this.props.leaveType !== nextProps.leaveType ||
      this.props.statusType !== nextProps.statusType ||
      this.props.status !== nextProps.status ||
      this.props.isNotify !== nextProps.isNotify
    ) {
      this.props.setShouldUpdate();
    }
  }
};

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage 
        config={props.config} 
        source={props.leaveApprovalState.all} 
        loadDataWhen={props.shouldUpdate} 
      >
        <LeaveApprovalListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            leaveType: props.leaveType,
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

export const LeaveApprovalList = compose<AllProps, IOwnOption>(
  setDisplayName('LeaveApprovalList'),
  withUser,
  withLeaveApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);