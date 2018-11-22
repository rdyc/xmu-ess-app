import AppMenu from '@constants/AppMenu';
import {
  CollectionConfig,
  CollectionDataProps,
  CollectionHandler,
  CollectionPage,
} from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import { ITimesheet } from '@timesheet/classes/response';
import { TimesheetEntryField, TimesheetUserAction } from '@timesheet/classes/types';
import { TimesheetEntrySumarry } from '@timesheet/components/entry/detail/shared/TimesheetEntrySummary';
import { timesheetEntryFieldTranslator } from '@timesheet/helper';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<ITimesheet, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.TimesheetApproval,
    parentUid: AppMenu.Timesheet,
    title: props.intl.formatMessage(timesheetMessage.approval.page.listTitle),
    description: props.intl.formatMessage(timesheetMessage.approval.page.listSubHeader),
  }),

  // top bar
  fields: Object.keys(TimesheetEntryField)
    .map(key => ({ 
      value: key, 
      name: TimesheetEntryField[key] 
    })),
  fieldTranslator: timesheetEntryFieldTranslator,

  // selection
  hasSelection: true,
  onProcessSelection: (values: string[]) => {
    alert(values.toString());
  },

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.timesheetApprovalState.all;

    if (request && request.filter && request.filter.query) {
      result = request.filter.query.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AllProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: TimesheetUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ]),

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },

  // events
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.timesheetApprovalState.all;
    const { loadAllRequest } = props.timesheetApprovalDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || !isLoading || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: user.company.uid,
            status: 'pending',
            query: {
              find: params.find,
              findBy: params.findBy,
              orderBy: params.orderBy,
              direction: params.direction,
              page: params.page,
              size: params.size,
            }
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (props: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.timesheetApprovalState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ITimesheet, index: number, props: AllProps) => ({
    key: index,
    primary: item.description ? item.description : 'N/A',
    secondary: props.intl.formatDate(item.date, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: item.uid,
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ITimesheet) => (
    <TimesheetEntrySumarry data={item} />
  ),

  // action component
  actionComponent: (item: ITimesheet, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/timesheet/approvals/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  ),
};

type AllProps
  = WithUser
  & WithTimesheetApproval
  & InjectedIntlProps;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const TimesheetApprovalList = compose(
  withUser,
  withTimesheetApproval,
  injectIntl
)(listView);