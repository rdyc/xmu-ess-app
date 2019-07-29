import AppMenu from '@constants/AppMenu';
import { IKPITemplateDetail } from '@KPI/classes/response';
import { KPIMessage } from '@KPI/locales/messages/KPIMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

import { KPITemplateDetailProps } from './KPITemplateDetail';
import { KPITemplateInformation } from './KPITemplateInformation';
import { KPITemplateItem } from './shared/KPITemplateItem';

export const KPITemplateDetailView: React.SFC<KPITemplateDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupEmployee,
      parentUid: AppMenu.Lookup,
      parentUrl: '/kpi/templates',
      title: props.intl.formatMessage(KPIMessage.template.page.detailTitle),
      description: props.intl.formatMessage(KPIMessage.template.page.detailSubHeader),
    }}
    state={props.KPITemplateState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPITemplateDetail) => ([
      <KPITemplateInformation data={data} />
    ])}
    secondary={(data: IKPITemplateDetail) => ([
      <KPITemplateItem items={data.items}/>
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