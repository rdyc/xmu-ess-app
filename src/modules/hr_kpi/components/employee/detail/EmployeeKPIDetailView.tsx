import AppMenu from '@constants/AppMenu';
import { IEmployeeKPIDetail } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

import { EmployeeKPIDetailProps } from './EmployeeKPIDetail';
import { EmployeeKPIInformation } from './shared/EmployeeKPIInformation';
import { EmployeeKPIItem } from './shared/EmployeeKPIItem';

export const EmployeeKPIDetailView: React.SFC<EmployeeKPIDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.EmployeeKPI,
      parentUid: AppMenu.HumanResource,
      parentUrl: `/kpi/employees/${props.match.params.employeeUid}`,
      title: props.intl.formatMessage(kpiMessage.template.page.detailTitle),
      description: props.intl.formatMessage(kpiMessage.template.page.detailSubHeader),
    }}
    state={props.employeeKPIState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IEmployeeKPIDetail) => ([
      <EmployeeKPIInformation data={data} />
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
      !props.employeeKPIState.detail.isLoading &&
      <EmployeeKPIItem 
        items={
          props.employeeKPIState.detail.response &&
          props.employeeKPIState.detail.response.data.items &&
          props.employeeKPIState.detail.response.data.items }
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