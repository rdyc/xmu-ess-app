import AppMenu from '@constants/AppMenu';
import { IHRTemplateDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

import { HRTemplateDetailProps } from './HRTemplateDetail';
import { HRTemplateInformation } from './HRTemplateInformation';

export const HRTemplateDetailView: React.SFC<HRTemplateDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupEmployee,
      parentUid: AppMenu.Lookup,
      parentUrl: '/kpi/templates',
      title: props.intl.formatMessage(hrMessage.template.page.detailTitle),
      description: props.intl.formatMessage(hrMessage.template.page.detailSubHeader),
    }}
    state={props.hrTemplateState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IHRTemplateDetail) => ([
      <HRTemplateInformation data={data} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="kpi-template-option"
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