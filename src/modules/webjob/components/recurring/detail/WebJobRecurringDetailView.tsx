import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { Delete } from '@lookup/components/shared/Delete';
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