import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { ITimesheetDetail } from '@timesheet/classes/response';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';
import { ApprovalTimesheetsProps } from './ActionApproval';
import { TimesheetBulkInformation } from './TimesheetBulkInformation';

const config: SingleConfig<ITimesheetDetail, ApprovalTimesheetsProps> = {
  // page info
  page: (props: ApprovalTimesheetsProps) => ({
    uid: AppMenu.TimesheetApproval,
    parentUid: AppMenu.Timesheet,
    title: props.intl.formatMessage(timesheetMessage.entry.page.detailTitle),
    description: props.intl.formatMessage(timesheetMessage.entry.page.detailSubHeader)
  }),

  // parent url
  parentUrl: (props: ApprovalTimesheetsProps) => '/timesheet/approvals',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: ApprovalTimesheetsProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: TimesheetUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    }
  ]),

  // events
  onDataLoad: (props: ApprovalTimesheetsProps, callback: SingleHandler, forceReload?: boolean | false) => {
    // fool the system
    const { user } = props.userState;
    const { isLoading, request, response } = props.timesheetApprovalState.detail;
    const { loadDetailRequest } = props.timesheetApprovalDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.timesheetUids[0]) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.timesheetUid !== props.timesheetUids[0]) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          timesheetUid: props.timesheetUids[0]
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }

    // actually pull data from list like a boss
    const { handleLoadData } = props;
    
    handleLoadData();
  },
  onDataLoaded: (props: ApprovalTimesheetsProps) => {
    // set data loaded in local state
    props.setDataload();
  },
  onUpdated: (states: ApprovalTimesheetsProps, callback: SingleHandler) => {
    const { isLoading, response } = states.timesheetApprovalState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: ITimesheetDetail, props: ApprovalTimesheetsProps) => (
    <TimesheetBulkInformation 
      data={props.timesheets}
    />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ITimesheetDetail, props: ApprovalTimesheetsProps) => ([
    <React.Fragment>
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
    </React.Fragment>,
  ])
};

export const ActionApprovalView: React.SFC<ApprovalTimesheetsProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
    shouldDataReload={props.shouldDataReload}
  />
);