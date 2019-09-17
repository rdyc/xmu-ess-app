import AppMenu from '@constants/AppMenu';
import { IKPIFinalDetail } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

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
    state={props.kpiFinalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPIFinalDetail) => ([
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
      !props.kpiFinalState.detail.isLoading &&
      <KPIFinalItem 
        items={
          props.kpiFinalState.detail.response &&
          props.kpiFinalState.detail.response.data &&
          props.kpiFinalState.detail.response.data.items &&
          props.kpiFinalState.detail.response.data.items }
      />
    }
  </PreviewPage>
);