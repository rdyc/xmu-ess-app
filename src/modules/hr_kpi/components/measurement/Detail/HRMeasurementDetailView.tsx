import AppMenu from '@constants/AppMenu';
import { IKPIMeasurement } from '@KPI/classes/response/measurement';
import { KPIMessage } from '@KPI/locales/messages/KPIMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
// import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';
import { MeasurementDetailProps } from './KPIMeasurementDetail';
import { KPIMeasurementInformation } from './shared/KPIMeasurementInformation';

export const KPIMeasurementDetailView: React.SFC<MeasurementDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupCompany,
      parentUid: AppMenu.Lookup,
      title: props.intl.formatMessage(KPIMessage.measurement.page.detailTitle),
      description: props.intl.formatMessage(KPIMessage.measurement.page.detailSubHeader),
    }}
    state={props.KPIMeasurementState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPIMeasurement) => ([
      <KPIMeasurementInformation data={data}/>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="KPI-measurement-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  >
    {/* <Delete
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
    /> */}
  </PreviewPage>
);
