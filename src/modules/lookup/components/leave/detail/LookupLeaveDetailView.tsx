import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupLeaveDetail } from '@lookup/classes/response';
import { LookupLeaveUserAction } from '@lookup/classes/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { LookupLeaveDetailProps } from './LookupLeaveDetail';
import { LookupLeaveInformation } from './shared/LookupLeaveInformation';

const isContains = (statusType: WorkflowStatusType | undefined, statusTypes: string[]): boolean => { 
  return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
};

const config: SingleConfig<ILookupLeaveDetail, LookupLeaveDetailProps> = {
  // page info
  page: (props: LookupLeaveDetailProps) => ({
    uid: AppMenu.LookupLeave,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.leave.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.leave.page.detailSubHeader)
  }),
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: LookupLeaveDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: LookupLeaveUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    },
    {
      id: LookupLeaveUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: state.statusType !== undefined,
      visible: isContains(state.statusType, [ WorkflowStatusType.Submitted ]),
      onClick: props.handleOnModify
    }
  ]),

  // events
  onDataLoad: (props: LookupLeaveDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.lookupLeaveState.detail;
    const { loadDetailRequest } = props.lookupLeaveDispatch;

    // when user is set and not loading and has LeaveUid in route params
    if (user && !isLoading && props.match.params) {
      // when LeaveUid was changed or response are empty or force to reload
      if ((request && request.leaveUid !== props.match.params.leaveUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: props.match.params.companyUid,
          leaveUid: props.match.params.leaveUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (props: LookupLeaveDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.lookupLeaveState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
    }
  },

  // primary
  primaryComponent: (data: ILookupLeaveDetail, props: LookupLeaveDetailProps) => (
    <LookupLeaveInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ILookupLeaveDetail, props: LookupLeaveDetailProps) => ([
  ])
};

export const LookupLeaveDetailView: React.SFC<LookupLeaveDetailProps> = props => (
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