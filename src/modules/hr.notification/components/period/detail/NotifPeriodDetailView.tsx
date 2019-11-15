import AppMenu from '@constants/AppMenu';
import { INotifPeriod } from '@hr.notification/classes/response';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';

import { NotifPeriodInformation } from '../shared/NotifPeriodInformation';
import { NotifPeriodDetailProps } from './NotifPeriodDetail';

export const NotifPeriodDetailView: React.SFC<NotifPeriodDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.HRNotifPeriod,
      parentUid: AppMenu.Lookup,
      parentUrl: '/hr/notification/periods',
      title: props.intl.formatMessage(notifMessage.period.page.detailTitle),
      description: props.intl.formatMessage(notifMessage.period.page.detailSubHeader),
    }}
    state={props.notifPeriodState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: INotifPeriod) => ([
      <NotifPeriodInformation data={data}/>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="notification-period-option"
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
      onSubmit={props.handleDelete} 
      onSubmitSuccess={props.handleDeleteSuccess}
      onSubmitFail={props.handleDeleteFail}
    />
  </PreviewPage>
);
