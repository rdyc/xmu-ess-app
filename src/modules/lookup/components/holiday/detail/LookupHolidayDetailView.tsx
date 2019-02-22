import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';

import { ILookupHolidayDetail } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { HolidayDetailProps } from './LookupHolidayDetail';
import { LookupHolidayInformation } from './shared/LookupHolidayInformation';

export const LookupHolidayDetailView: React.SFC<HolidayDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupHoliday,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/holidays',
      title: props.intl.formatMessage(lookupMessage.holiday.page.detailTitle),
      description: props.intl.formatMessage(lookupMessage.holiday.page.detailSubHeader),
    }}
    options={props.pageOptions}
    state={props.lookupHolidayState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ILookupHolidayDetail) => (
      <LookupHolidayInformation data={data} />
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