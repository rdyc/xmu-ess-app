import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { ILookupLeaveDetail } from '@lookup/classes/response';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';

import { LeaveDetailProps } from './LookupLeaveDetail';
import { LookupLeaveInformation } from './shared/LookupLeaveInformation';

export const LookupLeaveDetailView: React.SFC<LeaveDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupLeave,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/leaves',
      title: props.intl.formatMessage(lookupMessage.leave.page.detailTitle),
      description: props.intl.formatMessage(lookupMessage.leave.page.detailSubHeader),
    }}
    state={props.lookupLeaveState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ILookupLeaveDetail) => (
      <LookupLeaveInformation data={data} />
    )}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="lookup-leave-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
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
      onSubmit={props.handleSubmit} 
      onSubmitSuccess={props.handleSubmitSuccess}
      onSubmitFail={props.handleSubmitFail}
    />
  </PreviewPage>
);