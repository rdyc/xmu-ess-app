import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IRoleDetail } from '@lookup/classes/response';
import { LookupUserAction } from '@lookup/classes/types';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { RoleDetailProps } from './LookupRoleDetail';
import { LookupRoleInformation } from './shared/LookupRoleInformation';
import { LookupRoleMenu } from './shared/LookupRoleMenu';

const config: SingleConfig<IRoleDetail, RoleDetailProps> = {
  // page info
  page: (props: RoleDetailProps) => ({
    uid: AppMenu.LookupRole,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.role.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.role.page.detailSubHeader),
  }),
  
  // parent url
  parentUrl: (props: RoleDetailProps) => '/lookup/roles',
  
  // action centre
  showActionCentre: true,
  
  // more
  hasMore: true,
  moreOptions: (props: RoleDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: LookupUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
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
  onDataLoad: (props: RoleDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.lookupRoleState.detail;
    const { loadDetailRequest } = props.lookupRoleDispatch;

    // when user is set and not loading and has timesheetUid in route params
    if (user && !isLoading && props.match.params.roleUid && props.history.location.state) {
      // when timesheetUid was changed or response are empty or force to reload
      if ((request && request.roleUid !== props.match.params.roleUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: props.history.location.state.companyUid,
          roleUid: props.match.params.roleUid,
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: RoleDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.lookupRoleState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
    }
  },
  
  // primary
  primaryComponent: (data: IRoleDetail, props: RoleDetailProps) => (
    <LookupRoleInformation data={data}/>
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IRoleDetail, props: RoleDetailProps) => ([
    <LookupRoleMenu 
      data={data.menus}
      title={props.intl.formatMessage(lookupMessage.role.section.roleMenuTitle)}
      // subHeader={props.intl.formatMessage(lookupMessage.role.section.roleMenuSubHeader)}
    />
  ])
};

export const LookupRoleDetailView: React.SFC<RoleDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  >
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
      onSubmit={props.handleDelete} 
      onSubmitSuccess={props.handleDeleteSuccess}
      onSubmitFail={props.handleDeleteFail}
    />
  </SinglePage>
);
