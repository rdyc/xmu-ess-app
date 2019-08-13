import AppMenu from '@constants/AppMenu';
import { IKPITemplateDetail } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

import { KPITemplateDetailProps } from './KPITemplateDetail';
import { KPITemplateInformation } from './shared/KPITemplateInformation';
import { KPITemplateItem } from './shared/KPITemplateItem';

export const KPITemplateDetailView: React.SFC<KPITemplateDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.KPITemplate,
      parentUid: AppMenu.Lookup,
      parentUrl: '/kpi/templates',
      title: props.intl.formatMessage(kpiMessage.template.page.detailTitle),
      description: props.intl.formatMessage(kpiMessage.template.page.detailSubHeader),
    }}
    state={props.kpiTemplateState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPITemplateDetail) => ([
      <KPITemplateInformation data={data} />
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
    <KPITemplateItem 
      items={
        props.kpiTemplateState.detail.response &&
        props.kpiTemplateState.detail.response.data.items &&
        props.kpiTemplateState.detail.response.data.items 
      }/>
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