import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TuneIcon from '@material-ui/icons/Tune';
import { isTimesheetEditable } from '@organization/helper/isTimesheetEditable';
import { ITimesheet } from '@timesheet/classes/response';
import { TimesheetEntryField } from '@timesheet/classes/types';
import { WithTimesheetEntry, withTimesheetEntry } from '@timesheet/hoc/withTimesheetEntry';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { TimesheetEntrySumarry } from '../detail/shared/TimesheetEntrySummary';
import { ITimesheetEntryListFilterResult, TimesheetEntryListFilter } from './TimesheetEntryListFilter';

interface IOwnOption {

}

interface IOwnState extends ITimesheetEntryListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<ITimesheet>;
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
  handleFilterApplied: (filter: ITimesheetEntryListFilterResult) => void;
}

type AllProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithTimesheetEntry
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.timesheetEntryState.all}
        loadDataWhen={props.shouldUpdate}
      >
        <TimesheetEntryListFilter
          isOpen={props.isFilterOpen}
          initialProps={{
            customerUid: props.customerUid,
            activityType: props.activityType,
            statusType: props.statusType,
            status: props.status,
            isRejected: props.isRejected,
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
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<ITimesheet>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: ITimesheetEntryListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ITimesheetEntryListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.timesheetEntryState.all;
    const { loadAllRequest } = this.props.timesheetEntryDispatch;

    const config: IListConfig<ITimesheet> = {
      // page
      page: {
        uid: AppMenu.TimesheetHistory,
        parentUid: AppMenu.Timesheet,
        title: this.props.intl.formatMessage(timesheetMessage.entry.page.listTitle),
        description: this.props.intl.formatMessage(timesheetMessage.entry.page.listSubHeader)
      },

      // top bar
      fields: Object.keys(TimesheetEntryField)
        .map(key => ({
          value: key,
          name: TimesheetEntryField[key]
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
            this.props.history.push('/timesheet/requests/form');
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
                isRejected: this.props.isRejected,
                companyUid: this.props.companyUid,
                customerUid: this.props.customerUid,
                activityType: this.props.activityType,
                statusType: this.props.statusType,
                status: this.props.status,
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
      onBind: (item: ITimesheet, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: this.props.intl.formatDate(item.date, GlobalFormat.Date),
        tertiary: item.customer && item.customer.name || item.customerUid,
        quaternary: item.employee ? item.employee.fullName : 'N/A',
        quinary: item.status && item.status.value || item.statusType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: ITimesheet) => (
        <TimesheetEntrySumarry data={item} />
      ),

      // action component
      actionComponent: (item: ITimesheet, callback: ListHandler) => (
        <React.Fragment>
          {
            isTimesheetEditable(item.statusType) &&
            <Button
              size="small"
              onClick={() => this.props.history.push(`/timesheet/requests/form`, { uid: item.uid })}
            >
              <FormattedMessage {...layoutMessage.action.modify} />
            </Button>
          }

          <Button
            size="small"
            onClick={() => this.props.history.push(`/timesheet/requests/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details} />
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
              this.props.activityType !== undefined ||
              this.props.statusType !== undefined ||
              this.props.status !== undefined ||
              this.props.isRejected === true;
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
      this.props.activityType !== nextProps.activityType ||
      this.props.statusType !== nextProps.statusType ||
      this.props.status !== nextProps.status ||
      this.props.isRejected !== nextProps.isRejected
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const TimesheetEntryList = compose(
  setDisplayName('TimesheetEntryList'),
  withUser,
  withTimesheetEntry,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);