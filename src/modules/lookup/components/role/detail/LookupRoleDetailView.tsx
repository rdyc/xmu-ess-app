import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { IRoleDetail } from '@lookup/classes/response';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { LookupRoleDetailProps } from './LookupRoleDetail';
import { LookupRoleInformation } from './shared/LookupRoleInformation';
import { LookupRoleMenu } from './shared/LookupRoleMenu';

export const LookupRoleDetailView: React.SFC<LookupRoleDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupRole,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/roles',
      title: props.intl.formatMessage(lookupMessage.role.page.detailTitle),
      description: props.intl.formatMessage(lookupMessage.role.page.detailSubHeader),
    }}
    options={props.pageOptions}
    state={props.lookupRoleState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IRoleDetail) => (
      <LookupRoleInformation data={data} />
    )}
    secondary={(data: IRoleDetail) => ([
      <LookupRoleMenu
        data={data.menus}
        title={props.intl.formatMessage(lookupMessage.role.section.roleMenuTitle)}
      // subHeader={props.intl.formatMessage(lookupMessage.role.section.roleMenuSubHeader)}
      />
    ])}
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
  </PreviewPage>
);
