import AppMenu from '@constants/AppMenu';
import { IHRMeasurement } from '@hr/classes/response/measurement';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
// import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';
import { MeasurementDetailProps } from './HRMeasurementDetail';
import { HRMeasurementInformation } from './shared/HRMeasurementInformation';

export const HRMeasurementDetailView: React.SFC<MeasurementDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupCompany,
      parentUid: AppMenu.Lookup,
      title: props.intl.formatMessage(hrMessage.measurement.page.detailTitle),
      description: props.intl.formatMessage(hrMessage.measurement.page.detailSubHeader),
    }}
    state={props.hrMeasurementState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IHRMeasurement) => ([
      <HRMeasurementInformation data={data}/>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="hr-measurement-option"
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
