import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILeave } from '@leave/classes/response';
import { LeaveRequestField } from '@leave/classes/types';
import { LeaveSummary } from '@leave/components/request/detail/shared/LeaveSummary';
import { WithLeaveRequest, withLeaveRequest } from '@leave/hoc/withLeaveRequest';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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

import { isLeaveRequestEditable } from '@organization/helper/isLeaveRequestEditable';
import { ILeaveRequestListFilterResult, LeaveRequestListFilter } from './LeaveRequestListFilter';

interface IOwnOption {
  
}

interface IOwnState extends ILeaveRequestListFilterResult {
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
  handleFilterApplied: (filter: ILeaveRequestListFilterResult) => void;
}

type AllProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLeaveRequest
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage 
        config={props.config} 
        source={props.leaveRequestState.all} 
        loadDataWhen={props.shouldUpdate} 
      >
        <LeaveRequestListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            leaveType: props.leaveType,
            statusType: props.statusType,
            isRejected: props.isRejected,
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => {
  const { request } = props.leaveRequestState.all;
  
  // default state
  const state: IOwnState = {
    shouldUpdate: false,
    isFilterOpen: false
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.isRejected = props.location.state.isRejected;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.leaveType = request.filter.leaveType,
      state.statusType = request.filter.statusType,
      state.isRejected = request.filter.isRejected;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldUpdate: !state.shouldUpdate
  }),
  setConfig: (state: IOwnState) => (config: IListConfig<ILeave>): Partial<IOwnState> => ({
    config
  }),
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILeaveRequestListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ILeaveRequestListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.leaveRequestState.all;
    const { loadAllRequest } = this.props.leaveRequestDispatch;

    const config: IListConfig<ILeave> = {
      // page
      page: {
        uid: AppMenu.LeaveRequest,
        parentUid: AppMenu.Leave,
        title: this.props.intl.formatMessage(leaveMessage.request.page.listTitle),
        description: this.props.intl.formatMessage(leaveMessage.request.page.listSubHeader)
      },
      
      // top bar
      fields: Object.keys(LeaveRequestField)
        .map(key => ({ 
          value: key, 
          name: LeaveRequestField[key] 
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

      // toolbar controls
      toolbarControls: (callback: ListHandler) => [
        {
          icon: AddCircleIcon,
          onClick: () => { 
            this.props.history.push('/leave/requests/form'); 
          }
        }
      ],
    
      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean, resetPage?: boolean) => {
        // when user is set and not loading
        if (user && !isLoading) {
          // when request, response are empty or force reloading
          if (!request || !response || forceReload) {
            loadAllRequest({
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              filter: {
                leaveType: this.props.leaveType,
                statusType: this.props.statusType,
                isRejected: this.props.isRejected,
                find: params.find,
                findBy: params.findBy,
                orderBy: params.orderBy,
                direction: params.direction,
                page: resetPage ? 1 : params.page,
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
        quaternary: item.regular && item.regular.leave && item.regular.leave.name || 'Regular Type',
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
          {
            isLeaveRequestEditable(item.statusType) &&
            <Button 
              size="small"
              onClick={() => this.props.history.push(`/leave/requests/form`, { uid: item.uid })}
            >
              <FormattedMessage {...layoutMessage.action.modify}/>
            </Button>
          }

          <Button 
            size="small"
            onClick={() => this.props.history.push(`/leave/requests/${item.uid}`)}
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
              this.props.isRejected === true ;
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
      this.props.isRejected !== nextProps.isRejected 
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const LeaveRequestList = compose(
  setDisplayName('LeaveRequestList'),
  withUser,
  withLeaveRequest,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);