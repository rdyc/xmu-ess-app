import { AccountLeave } from '@account/components/leave/AccountLeave';
import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILeaveDetail } from '@leave/classes/response';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { LeaveRequestDetailProps } from './LeaveRequestDetail';
import { LeaveInformation } from './shared/LeaveInformation';

const isContains = (statusType: WorkflowStatusType | undefined, statusTypes: string[]): boolean => { 
  return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
};

const config: SingleConfig<ILeaveDetail, LeaveRequestDetailProps> = {
  // page info
  page: (props: LeaveRequestDetailProps) => ({
    uid: AppMenu.LeaveRequest,
    parentUid: AppMenu.Leave,
    title: props.intl.formatMessage(leaveMessage.request.page.detailTitle),
    description: props.intl.formatMessage(leaveMessage.request.page.detailSubHeader)
  }),

  // parent url
  parentUrl: (props: LeaveRequestDetailProps) => '/leave/requests',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: LeaveRequestDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: LeaveRequestUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    },
    {
      id: LeaveRequestUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: state.statusType !== undefined,
      visible: isContains(state.statusType, [ WorkflowStatusType.Submitted ]),
      onClick: props.handleOnModify
    }
  ]),

  // events
  onDataLoad: (props: LeaveRequestDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.leaveRequestState.detail;
    const { loadDetailRequest } = props.leaveRequestDispatch;

    // when user is set and not loading and has LeaveUid in route params
    if (user && !isLoading && props.match.params.leaveUid) {
      // when LeaveUid was changed or response are empty or force to reload
      if ((request && request.leaveUid !== props.match.params.leaveUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          leaveUid: props.match.params.leaveUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onUpdated: (props: LeaveRequestDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.leaveRequestState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: ILeaveDetail, props: LeaveRequestDetailProps) => (
    <LeaveInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ILeaveDetail, props: LeaveRequestDetailProps) => ([
    <AccountLeave />,
    <WorkflowHistory data={data.workflow} />
  ])
};

export const LeaveRequestDetailView: React.SFC<LeaveRequestDetailProps> = props => (
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