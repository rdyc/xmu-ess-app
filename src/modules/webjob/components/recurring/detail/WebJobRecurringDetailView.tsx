import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { IWebJobRecurringDetail } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { WebJobRecurringDetailProps } from './WebJobRecurringDetail';
import { WebJobRecurringInformation } from './WebJobRecurringInformation';

export const WebJobRecurringDetailView: React.SFC<WebJobRecurringDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.WebJob,
      parentUid: AppMenu.Home,
      parentUrl: `/webjob/recurrings`,
      title: props.intl.formatMessage(webJobMessage.shared.page.listTitle, { state: 'Web Job Recurring'}),
    }}
    state={props.webJobRecurringState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IWebJobRecurringDetail) => ([
      <WebJobRecurringInformation data={data} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu
        id="webjob-recurring-option"
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