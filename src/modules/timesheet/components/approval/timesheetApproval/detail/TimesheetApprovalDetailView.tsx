import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITimesheetDetail } from '@timesheet/classes/response';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { TimesheetInformation } from '@timesheet/components/entry/detail/shared/TimesheetInformation';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';
import { TimesheetApprovalDetailProps } from './TimesheetApprovalDetail';

const config: SingleConfig<ITimesheetDetail, TimesheetApprovalDetailProps> = {
  // page info
  page: (props: TimesheetApprovalDetailProps) => ({
    uid: AppMenu.TimesheetApproval,
    parentUid: AppMenu.Timesheet,
    title: props.intl.formatMessage(timesheetMessage.entry.page.detailTitle),
    description: props.intl.formatMessage(timesheetMessage.entry.page.detailSubHeader),
  }),

  // parent url
  parentUrl: (props: TimesheetApprovalDetailProps) => '/timesheet/approvals',

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: TimesheetApprovalDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: TimesheetUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ]),

  // events
  onDataLoad: (props: TimesheetApprovalDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
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
  onDataLoaded: (props: TimesheetApprovalDetailProps) => {
    // set data loaded in local state
    props.setDataload();
  },
  onUpdated: (states: TimesheetApprovalDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.timesheetApprovalState.detail;

    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: ITimesheetDetail, props: TimesheetApprovalDetailProps) => (
    <TimesheetInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ITimesheetDetail, props: TimesheetApprovalDetailProps) => ([
    <WorkflowHistory data={data.workflow} />,
    <React.Fragment>
      {
        data.workflow && 
        data.workflow.isApproval &&
        <WorkflowApprovalForm
          approvalTitle={props.approvalTitle}
          approvalSubHeader={props.approvalSubHeader}
          approvalChoices={props.approvalChoices}
          approvalTrueValue={props.approvalTrueValue}
          approvalDialogTitle={props.approvalDialogTitle}
          approvalDialogContentText={props.approvalDialogContentText}
          approvalDialogCancelText={props.approvalDialogCancelText}
          approvalDialogConfirmedText={props.approvalDialogConfirmedText}
          validate={props.handleValidate}
          onSubmit={props.handleSubmit} 
          onSubmitSuccess={props.handleSubmitSuccess}
          onSubmitFail={props.handleSubmitFail}
        />
      }
    </React.Fragment>
  ])
};

export const TimesheetApprovalDetailView: React.SFC<TimesheetApprovalDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
    shouldDataReload={props.shouldDataReload}
  />
);