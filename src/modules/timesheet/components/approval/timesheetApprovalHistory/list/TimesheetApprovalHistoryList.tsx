import AppMenu from '@constants/AppMenu';
import { ICollectionValue } from '@layout/classes/core';
import {
  CollectionConfig,
  CollectionDataProps,
  CollectionHandler,
  CollectionPage,
  CollectionPageProps,
} from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import { ITimesheet } from '@timesheet/classes/response';
import { TimesheetField, TimesheetUserAction } from '@timesheet/classes/types';
import { TimesheetSumarry } from '@timesheet/components/entry/detail/shared/TimesheetSummary';
// import { projectRegistrationFieldTranslator } from '@project/helper';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';

const timesheetFields: ICollectionValue[] = Object.keys(TimesheetField).map(key => ({
  value: key,
  name: TimesheetField[key]
}));

const config: CollectionConfig<ITimesheet, AllProps> = {
  // page info
  uid: AppMenu.TimesheetApprovalHistory,
  parentUid: AppMenu.Timesheet,
  title: 'Time Report Approval History',
  description: 'Demo of collection page',

  // top bar
  fields: timesheetFields,
  // fieldTranslator: projectRegistrationFieldTranslator,

  // selection
  // hasSelection: true,
  // selectionProcessing: (values: string[]) => {
  //   alert(values.toString());
  // },

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
  moreOptions: (props: CollectionPageProps): IAppBarMenu[] => ([
    {
      id: TimesheetUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => props.setForceReload(true)
    }
  ]),

  // redirection
  hasRedirection: true,
  onRedirect: (item: ITimesheet): string => {
    return `/timesheet/approvals/history/${item.uid}`;
  },

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
            status: 'complete',
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

    callback.setLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ITimesheet, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.date,
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: item.project && item.project.name || item.projectUid,
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ITimesheet) => (
    <TimesheetSumarry data={item} />
  ),

  // action component
  actionComponent: (item: ITimesheet) => (
    <Button
      size="small"
      onClick={() => alert(`go to ${item.uid}`)}
    >
      <FormattedMessage {...layoutMessage.action.details} />
    </Button>
  ),

  // custom row render: uncomment to see different
  // onRowRender: (item: IProject, index: number) => (
  //   <div key={index}>{item.name}</div>
  // )
};

// const menuOptions = (props: CollectionPageProps): IAppBarMenu[] => ([
//   {
//     id: TimesheetUserAction.Refresh,
//     name: props.intl.formatMessage(layoutMessage.action.refresh),
//     enabled: true,
//     visible: true,
//     onClick: () => props.setForceReload(true)
//   },
//   {
//     id: TimesheetUserAction.Create,
//     name: props.intl.formatMessage(layoutMessage.action.create),
//     enabled: true,
//     visible: true,
//     onClick: () => console.log('asdas')
//   }
// ]);

type AllProps
  = WithUser
  & WithTimesheetApproval;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const TimesheetApprovalHistoryList = compose(
  withUser,
  withTimesheetApproval
)(listView);