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
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import { isTimesheetEditable } from '@organization/helper/isTimesheetEditable';
import { ITimesheet } from '@timesheet/classes/response';
import { TimesheetEntryField, TimesheetUserAction } from '@timesheet/classes/types';
import { TimesheetEntrySumarry } from '@timesheet/components/entry/detail/shared/TimesheetEntrySummary';
import { timesheetEntryFieldTranslator } from '@timesheet/helper';
import { WithTimesheetEntry, withTimesheetEntry } from '@timesheet/hoc/withTimesheetEntry';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<ITimesheet, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.TimesheetHistory,
    parentUid: AppMenu.Timesheet,
    title: props.intl.formatMessage(timesheetMessage.entry.page.listTitle),
    description: props.intl.formatMessage(timesheetMessage.entry.page.listSubHeader),
  }),

  // top bar
  fields: Object.keys(TimesheetEntryField)
    .map(key => ({
      value: key,
      name: TimesheetEntryField[key]
    })),
  fieldTranslator: timesheetEntryFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.timesheetEntryState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
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
    },
    {
      id: TimesheetUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/timesheet/requests/form`)
    }
  ]),

  // events
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.timesheetEntryState.all;
    const { loadAllRequest } = props.timesheetEntryDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          filter: {
            isRejected: undefined,
            companyUid: undefined,
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
  onUpdated: (props: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.timesheetEntryState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ITimesheet, index: number, props: AllProps) => ({
    key: index,
    primary: item.uid,
    secondary: props.intl.formatDate(item.date, GlobalFormat.Date),
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: item.description ? item.description : 'N/A',
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
      {
        isTimesheetEditable(item.statusType) &&
        <Button
          size="small"
          onClick={() => callback.handleRedirectTo(`/timesheet/requests/form`, { uid: item.uid })}
        >
          <FormattedMessage {...layoutMessage.action.modify} />
        </Button>
      }

      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/timesheet/requests/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details} />
      </Button>
    </React.Fragment>
  ),

};

type AllProps
  = WithUser
  & WithTimesheetEntry
  & InjectedIntlProps;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const TimesheetEntryList = compose(
  withUser,
  withTimesheetEntry,
  injectIntl
)(listView);