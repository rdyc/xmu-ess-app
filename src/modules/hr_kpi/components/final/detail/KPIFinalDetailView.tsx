import AppMenu from '@constants/AppMenu';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

import { IKPIFinal } from '@account/classes/response/employeeKPI';
import { KPIFinalDetailProps } from './KPIFinalDetail';
import { KPIFinalInformation } from './shared/KPIFinalInformation';
import { KPIFinalItem } from './shared/KPIFinalItem';

export const KPIFinalDetailView: React.SFC<KPIFinalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.KPIEmployee,
      parentUid: AppMenu.HumanResource,
      parentUrl: `/kpi/finals/${props.match.params.employeeUid}`,
      title: props.intl.formatMessage(kpiMessage.employee.page.detailTitle),
      description: props.intl.formatMessage(kpiMessage.employee.page.detailSubHeader),
    }}
    state={props.accountEmployeeKPIState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPIFinal) => ([
      <KPIFinalInformation data={data} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="kpi-final-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  >
    {
      !props.accountEmployeeKPIState.detail.isLoading &&
      <KPIFinalItem 
        items={
          props.accountEmployeeKPIState.detail.response &&
          props.accountEmployeeKPIState.detail.response.data &&
          props.accountEmployeeKPIState.detail.response.data.items &&
          props.accountEmployeeKPIState.detail.response.data.items }
      />
    }
  </PreviewPage>
);