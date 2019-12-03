import AppMenu from '@constants/AppMenu';
import { IKPIOpen } from '@kpi/classes/response/open';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
import { KPIOpenDetailProps } from './KPIOpenDetail';
import { KPIOpenInformation } from './shared/KPIOpenInformation';

export const KPIOpenDetailView: React.SFC<KPIOpenDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.KPIOpen,
      parentUid: AppMenu.Lookup,
      parentUrl: '/kpi/opens',
      title: props.intl.formatMessage(kpiMessage.open.page.detailTitle),
      description: props.intl.formatMessage(kpiMessage.open.page.detailSubHeader),
    }}
    state={props.kpiOpenState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPIOpen) => ([
      <KPIOpenInformation data={data}/>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="kpi-open-option"
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
