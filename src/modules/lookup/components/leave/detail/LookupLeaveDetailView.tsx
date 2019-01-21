import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupLeaveDetail } from '@lookup/classes/response';
import { LookupUserAction } from '@lookup/classes/types';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { LookupLeaveDetailProps } from './LookupLeaveDetail';
import { LookupLeaveInformation } from './shared/LookupLeaveInformation';

const config: SingleConfig<ILookupLeaveDetail, LookupLeaveDetailProps> = {
  // page info
  page: (props: LookupLeaveDetailProps) => ({
    uid: AppMenu.LookupLeave,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.leave.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.leave.page.detailSubHeader),
  }),
  
  // parent url
  parentUrl: (props: LookupLeaveDetailProps) => '/lookup/leaves',

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: LookupLeaveDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: LookupUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: LookupUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: () => props.handleOnOpenDialog(LookupUserAction.Modify)
    },
    {
      id: LookupUserAction.Delete,
      name: props.intl.formatMessage(layoutMessage.action.delete),
      enabled: true,
      visible: true,
      onClick: () => props.handleOnOpenDialog(LookupUserAction.Delete)
    }
  ]),

  // events
  onDataLoad: (props: LookupLeaveDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.lookupLeaveState.detail;
    const { loadDetailRequest } = props.lookupLeaveDispatch;

    // when user is set and not loading and has leaveUid in route params
    if (user && !isLoading && props.history.location.state && props.match.params.leaveUid) {
      // when leaveUid was changed or response are empty or force to reload
      if ((request && request.leaveUid !== props.match.params.leaveUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: props.history.location.state.companyUid,
          leaveUid: props.match.params.leaveUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: LookupLeaveDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.lookupLeaveState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
    }
  },

  // primary
  primaryComponent: (data: ILookupLeaveDetail) => (
    <LookupLeaveInformation data={data} />
  ),

  secondaryComponents: (data: ILookupLeaveDetail, props: LookupLeaveDetailProps) => ([
    //
  ])
};

export const LookupLeaveDetailView: React.SFC<LookupLeaveDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  >
    <React.Fragment>
      <Delete 
        action={props.action}
        isOpenDialog={props.dialogOpen}
        title={props.dialogTitle}
        content={props.dialogContent}
        labelCancel={props.dialogCancelLabel}
        labelConfirm={props.dialogConfirmLabel}
        handleDialogOpen={props.handleOnOpenDialog}
        handleDialogClose={props.handleOnCloseDialog}
        handleDialogConfirmed={props.handleOnConfirm}
        onSubmit={props.handleSubmit} 
        onSubmitSuccess={props.handleSubmitSuccess}
        onSubmitFail={props.handleSubmitFail}
      />
    </React.Fragment>
  </SinglePage>
);