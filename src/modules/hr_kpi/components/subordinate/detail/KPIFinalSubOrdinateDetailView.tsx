import AppMenu from '@constants/AppMenu';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

import { IKPIFinal } from '@account/classes/response/employeeKPIFinal';
import { KPIFinalInformation } from '@kpi/components/final/detail/shared/KPIFinalInformation';
import { KPIFinalItem } from '@kpi/components/final/detail/shared/KPIFinalItem';
import { KPIFinalSubOrdinateDetailProps } from './KPIFinalSubOrdinateDetail';

export const KPIFinalSubOrdinateDetailView: React.SFC<KPIFinalSubOrdinateDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.KPISubOrdinate,
      parentUid: AppMenu.HumanResource,
      parentUrl: `/kpi/subordinates/${props.match.params.employeeUid}`,
      title: props.intl.formatMessage(kpiMessage.employee.page.detailTitle),
      description: props.intl.formatMessage(kpiMessage.employee.page.detailSubHeader),
    }}
    state={props.accountEmployeeKPIFinalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPIFinal) => ([
      <KPIFinalInformation data={data} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="kpi-final-subordinate-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  >
    {
      !props.accountEmployeeKPIFinalState.detail.isLoading &&
      <KPIFinalItem 
        items={
          props.accountEmployeeKPIFinalState.detail.response &&
          props.accountEmployeeKPIFinalState.detail.response.data &&
          props.accountEmployeeKPIFinalState.detail.response.data.items &&
          props.accountEmployeeKPIFinalState.detail.response.data.items }
      />
    }
  </PreviewPage>
);