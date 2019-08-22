import AppMenu from '@constants/AppMenu';
import { IKPIEmployeeDetail } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

import { KPIEmployeeInformation } from '@kpi/components/shared/KPIEmployeeInformation';
import { KPIEmployeeItem } from '@kpi/components/shared/KPIEmployeeItem';
import { KPIManagerInputDetailProps } from './KPIManagerInputDetail';

export const KPIManagerInputDetailView: React.SFC<KPIManagerInputDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.ManagerKPIInput,
      parentUid: AppMenu.HumanResource,
      parentUrl: `/kpi/managerinputs/${props.match.params.employeeUid}`,
      title: props.intl.formatMessage(kpiMessage.employee.page.detailTitle),
      description: props.intl.formatMessage(kpiMessage.employee.page.detailSubHeader),
    }}
    state={props.kpiEmployeeState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPIEmployeeDetail) => ([
      <KPIEmployeeInformation data={data} />
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
    {
      !props.kpiEmployeeState.detail.isLoading &&
      <KPIEmployeeItem 
        items={
          props.kpiEmployeeState.detail.response &&
          props.kpiEmployeeState.detail.response.data &&
          props.kpiEmployeeState.detail.response.data.items &&
          props.kpiEmployeeState.detail.response.data.items }
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