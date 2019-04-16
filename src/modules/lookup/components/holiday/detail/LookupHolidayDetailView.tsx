import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { ILookupHolidayDetail } from '@lookup/classes/response';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';

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
    state={props.lookupHolidayState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ILookupHolidayDetail) => ([
      <LookupHolidayInformation data={data} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="lookup-holiday-option"
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