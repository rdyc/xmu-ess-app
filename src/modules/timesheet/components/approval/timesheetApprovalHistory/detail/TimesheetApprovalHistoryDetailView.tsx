import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITimesheetDetail } from '@timesheet/classes/response';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { TimesheetInformation } from '@timesheet/components/entry/detail/shared/TimesheetInformation';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';
import { TimesheetApprovalHistoryDetailProps } from './TimesheetApprovalHistoryDetail';

const config: SingleConfig<ITimesheetDetail, TimesheetApprovalHistoryDetailProps> = {
  // page info
  page: (props: TimesheetApprovalHistoryDetailProps) => ({
    uid: AppMenu.TimesheetApprovalHistory,
    parentUid: AppMenu.Timesheet,
    title: props.intl.formatMessage(timesheetMessage.entry.page.detailTitle),
    description: props.intl.formatMessage(timesheetMessage.entry.page.detailSubHeader),
  }),

  // parent url
  parentUrl: (props: TimesheetApprovalHistoryDetailProps) => '/timesheet/approvals/history',

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: TimesheetApprovalHistoryDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: TimesheetUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ]),

  // events
  onDataLoad: (props: TimesheetApprovalHistoryDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.timesheetApprovalState.detail;
    const { loadDetailRequest } = props.timesheetApprovalDispatch;

    // when user is set and not loading and has timesheetUid in route params
    if (user && !isLoading && props.match.params.timesheetUid) {
      // when timesheetUid was changed or response are empty or force to reload
      if ((request && request.timesheetUid !== props.match.params.timesheetUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          timesheetUid: props.match.params.timesheetUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onUpdated: (states: TimesheetApprovalHistoryDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.timesheetApprovalState.detail;

    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: ITimesheetDetail, props: TimesheetApprovalHistoryDetailProps) => (
    <TimesheetInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ITimesheetDetail, props: TimesheetApprovalHistoryDetailProps) => ([
    <WorkflowHistory data={data.workflow} />
  ])
};

export const TimesheetApprovalHistoryDetailView: React.SFC<TimesheetApprovalHistoryDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  />
);