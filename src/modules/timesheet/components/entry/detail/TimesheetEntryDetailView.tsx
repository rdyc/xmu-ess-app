import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITimesheetDetail } from '@timesheet/classes/response';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';
import { TimesheetInformation } from './shared/TimesheetInformation';
import { TimesheetEntryDetailProps } from './TimesheetEntryDetail';

const isContains = (statusType: WorkflowStatusType | undefined, statusTypes: string[]): boolean => { 
  return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
};

const config: SingleConfig<ITimesheetDetail, TimesheetEntryDetailProps> = {
  // page info
  page: (props: TimesheetEntryDetailProps) => ({
    uid: AppMenu.TimesheetHistory,
    parentUid: AppMenu.Timesheet,
    title: props.intl.formatMessage(timesheetMessage.entry.page.detailTitle),
    description: props.intl.formatMessage(timesheetMessage.entry.page.detailSubHeader),
  }),

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: TimesheetEntryDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: TimesheetUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    },
    {
      id: TimesheetUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: state.statusType !== undefined,
      visible: isContains(state.statusType, [ WorkflowStatusType.Submitted ]),
      onClick: props.handleOnModify
    }
  ]),

  // events
  onDataLoad: (props: TimesheetEntryDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.timesheetEntryState.detail;
    const { loadDetailRequest } = props.timesheetEntryDispatch;

    // when user is set and not loading and has timesheetUid in route params
    if (user && !isLoading && props.match.params.timesheetUid) {
      // when timesheetUid was changed or response are empty or force to reload
      if ((request && request.timesheetUid !== props.match.params.timesheetUid) || !response || forceReload) {
        loadDetailRequest({
          timesheetUid: props.match.params.timesheetUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onUpdated: (states: TimesheetEntryDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.timesheetEntryState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },
  
  // primary
  primaryComponent: (data: ITimesheetDetail, props: TimesheetEntryDetailProps) => (
    <TimesheetInformation data={data}/>
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ITimesheetDetail, props: TimesheetEntryDetailProps) => ([
    <WorkflowHistory data={data.workflow} />
  ])
};

export const TimesheetEntryDetailView: React.SFC<TimesheetEntryDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  >
    <DialogConfirmation 
      isOpen={props.dialogOpen}
      fullScreen={props.dialogFullScreen}
      title={props.dialogTitle}
      content={props.dialogContent}
      labelCancel={props.dialogCancelLabel}
      labelConfirm={props.dialogConfirmLabel}
      onClickCancel={props.handleOnCloseDialog}
      onClickConfirm={props.handleOnConfirm}
    />
  </SinglePage>
);
