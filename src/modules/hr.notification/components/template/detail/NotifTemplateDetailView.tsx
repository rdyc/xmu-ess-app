import AppMenu from '@constants/AppMenu';
import { INotifTemplateDetail } from '@hr.notification/classes/response';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
import { NotifTemplateContent } from '../shared/NotifTemplateContent';
import { NotifTemplateInformation } from '../shared/NotifTemplateInformation';
import { NotifTemplateDetailProps } from './NotifTemplateDetail';

export const NotifTemplateDetailView: React.SFC<NotifTemplateDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.HRNotifTemplate,
      parentUid: AppMenu.HRNotif,
      parentUrl: '/hr/notification/templates',
      title: props.intl.formatMessage(notifMessage.template.page.detailTitle),
      description: props.intl.formatMessage(notifMessage.template.page.detailSubHeader),
    }}
    state={props.notifTemplateState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: INotifTemplateDetail) => ([
      <NotifTemplateInformation data={data}/>
    ])}
    secondary={(data: INotifTemplateDetail) => ([
      <NotifTemplateContent content={data.content}/>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="notification-template-option"
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
