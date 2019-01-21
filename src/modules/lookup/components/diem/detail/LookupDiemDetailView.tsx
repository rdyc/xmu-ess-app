import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IDiem } from '@lookup/classes/response';
import { LookupUserAction } from '@lookup/classes/types';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { LookupDiemDetailProps } from './LookupDiemDetail';
import { LookupDiemInformation } from './shared/LookupDiemInformation';

const config: SingleConfig<IDiem, LookupDiemDetailProps> = {
  // page info
  page: (props: LookupDiemDetailProps) => ({
    uid: AppMenu.LookupDiem,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.lookupDiem.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.lookupDiem.page.detailSubHeader),
  }),

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: LookupDiemDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
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
  onDataLoad: (props: LookupDiemDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.lookupDiemState.detail;
    const { loadDetailRequest } = props.lookupDiemDispatch;

    // when user is set and not loading and has diemUid in route params
    if (user && !isLoading && props.match.params.diemUid && props.history.location.state) {
      // when diemUid was changed or response are empty or force to reload
      if ((request && request.diemUid !== props.match.params.diemUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: props.history.location.state.company,
          diemUid: props.match.params.diemUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: LookupDiemDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.lookupDiemState.detail;

    callback.handleLoading(isLoading);

    if (response && response.data) {
      callback.handleResponse(response);
    }
  },

  // primary
  primaryComponent: (data: IDiem, props: LookupDiemDetailProps) => (
    <LookupDiemInformation data={data}/>
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IDiem, props: LookupDiemDetailProps) => ([])
};

export const LookupDiemDetailView: React.SFC<LookupDiemDetailProps> = props => (
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