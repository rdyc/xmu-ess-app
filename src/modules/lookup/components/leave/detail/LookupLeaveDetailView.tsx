import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';

import { ILookupLeaveDetail } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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
    options={props.pageOptions}
    state={props.lookupLeaveState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ILookupLeaveDetail) => (
      <LookupLeaveInformation data={data} />
    )}
    secondary={() => ([
      //
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
      onSubmit={props.handleSubmit} 
      onSubmitSuccess={props.handleSubmitSuccess}
      onSubmitFail={props.handleSubmitFail}
    />
  </PreviewPage>
);