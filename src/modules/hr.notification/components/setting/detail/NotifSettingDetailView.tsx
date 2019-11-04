import AppMenu from '@constants/AppMenu';
import { INotifSettingDetail } from '@hr.notification/classes/response';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
import { NotifSettingInformation } from '../shared/NotifSettingInformation';
import { NotifSettingMail } from '../shared/NotifSettingMail';
import { NotifSettingDetailProps } from './NotifSettingDetail';

export const NotifSettingDetailView: React.SFC<NotifSettingDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.HRNotifSetting,
      parentUid: AppMenu.Lookup,
      parentUrl: '/hr/notification/settings',
      title: props.intl.formatMessage(notifMessage.setting.page.detailTitle),
      description: props.intl.formatMessage(notifMessage.setting.page.detailSubHeader),
    }}
    state={props.notifSettingState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: INotifSettingDetail) => ([
      <NotifSettingInformation data={data}/>
    ])}
    secondary={(data: INotifSettingDetail) => ([
      <NotifSettingMail 
        title={props.intl.formatMessage(notifMessage.setting.section.mailToTitle)}
        label={props.intl.formatMessage(notifMessage.setting.field.to)}
        values={data.to}
      />
    ])}
    tertiary={(data: INotifSettingDetail) => ([
      <NotifSettingMail 
        title={props.intl.formatMessage(notifMessage.setting.section.mailCcTitle)}
        label={props.intl.formatMessage(notifMessage.setting.field.cc)}
        values={data.cc}
      />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="notification-setting-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  >
    <DialogConfirmation 
      isOpen={props.dialogOpen}
      fullScreen={props.dialogFullScreen}
      title={props.dialogTitle}
      content={props.dialogContent}
      labelCancel={props.dialogCancelLabel}
      labelConfirm={props.dialogConfirmLabel}
      onClickCancel={props.handleOnCloseDialog}
      onClickConfirm={props.handleOnConfirm}
    />
  </PreviewPage>
);
