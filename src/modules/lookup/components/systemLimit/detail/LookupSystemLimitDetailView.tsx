import AppMenu from '@constants/AppMenu';
// import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ISystemLimitDetail } from '@lookup/classes/response';
import { SystemLimitUserAction } from '@lookup/classes/types';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { SystemLimitDetailProps } from './LookupSystemLimitDetail';
import { LookupSystemLimitInformation } from './LookupSystemLimitInformation';

const config: SingleConfig<ISystemLimitDetail, SystemLimitDetailProps> = {
  // page info
  page: (props: SystemLimitDetailProps) => ({
    uid: AppMenu.LookupSystemLimit,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.systemLimit.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.systemLimit.page.detailSubHeader),
  }),
  
  // parent url
  parentUrl: (props: SystemLimitDetailProps) => '/lookup/systemlimits',

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: SystemLimitDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: SystemLimitUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: SystemLimitUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: () => props.handleOnOpenDialog(SystemLimitUserAction.Modify)
    },
    {
      id: SystemLimitUserAction.Delete,
      name: props.intl.formatMessage(layoutMessage.action.delete),
      enabled: true,
      visible: true,
      onClick: () => props.handleOnOpenDialog(SystemLimitUserAction.Delete)
    }
  ]),

  // events
  onDataLoad: (props: SystemLimitDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.systemLimitState.detail;
    const { loadDetailRequest } = props.systemLimitDispatch;

    // when user is set and not loading and has systemLimitUid in route params
    if (user && !isLoading && props.history.location.state && props.match.params.systemLimitUid) {
      // when systemLimitUid was changed or response are empty or force to reload
      if ((request && request.systemLimitUid !== props.match.params.systemLimitUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: props.history.location.state.companyUid,
          systemLimitUid: props.match.params.systemLimitUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: SystemLimitDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.systemLimitState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
    }
  },

  // primary
  primaryComponent: (data: ISystemLimitDetail) => (
    <LookupSystemLimitInformation data={data} />
  ),

  secondaryComponents: (data: ISystemLimitDetail, props: SystemLimitDetailProps) => ([
    //
  ])
};

export const LookupSystemLimitDetailView: React.SFC<SystemLimitDetailProps> = props => (
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