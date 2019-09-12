import AppMenu from '@constants/AppMenu';
import { IKPIAssignDetail } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

import { KPIAssignDetailProps } from './KPIAssignDetail';
import { KPIAssignInformation } from './shared/KPIAssignInformation';
import { KPIAssignItem } from './shared/KPIAssignItem';

export const KPIAssignDetailView: React.SFC<KPIAssignDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.HRKPIAssign,
      parentUid: AppMenu.Lookup,
      parentUrl: `/kpi/assigns/${props.match.params.employeeUid}`,
      title: props.intl.formatMessage(kpiMessage.employee.page.detailTitle),
      description: props.intl.formatMessage(kpiMessage.employee.page.detailSubHeader),
    }}
    state={props.kpiAssignState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPIAssignDetail) => ([
      <KPIAssignInformation data={data} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="kpi-assign-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  >
    {
      !props.kpiAssignState.detail.isLoading &&
      <KPIAssignItem 
        items={
          props.kpiAssignState.detail.response &&
          props.kpiAssignState.detail.response.data &&
          props.kpiAssignState.detail.response.data.items &&
          props.kpiAssignState.detail.response.data.items }
        useSelect
      />
    }
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