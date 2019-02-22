import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { IDiem } from '@lookup/classes/response';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { LookupDiemDetailProps } from './LookupDiemDetail';
import { LookupDiemInformation } from './shared/LookupDiemInformation';

export const LookupDiemDetailView: React.SFC<LookupDiemDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupDiem,
    parentUid: AppMenu.Lookup,
    parentUrl: '/lookup/diemvalue/list',
    title: props.intl.formatMessage(lookupMessage.lookupDiem.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.lookupDiem.page.detailSubHeader),
    }}
    options={props.pageOptions}
    state={props.lookupDiemState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IDiem) => (
      <LookupDiemInformation data={data}/>
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