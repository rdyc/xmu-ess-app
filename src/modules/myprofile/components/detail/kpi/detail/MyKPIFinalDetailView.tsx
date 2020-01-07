import AppMenu from '@constants/AppMenu';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

import { IKPIFinal } from '@account/classes/response/employeeKPIFinal';
import { MyKPIFinalDetailProps } from './MyKPIFinalDetail';
import { MyKPIFinalInformation } from './shared/MyKPIFinalInformation';
import { MyKPIFinalItem } from './shared/MyKPIFinalItem';

export const MyKPIFinalDetailView: React.SFC<MyKPIFinalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.MyProfile,
      parentUid: AppMenu.Account,
      parentUrl: `/account/profile/kpi`,
      title: props.intl.formatMessage(kpiMessage.employee.page.detailTitle),
      description: props.intl.formatMessage(kpiMessage.employee.page.detailSubHeader),
    }}
    state={props.accountEmployeeKPIFinalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPIFinal) => ([
      <MyKPIFinalInformation data={data} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="my-kpi-final-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  >
    {
      !props.accountEmployeeKPIFinalState.detail.isLoading &&
      <MyKPIFinalItem 
        items={
          props.accountEmployeeKPIFinalState.detail.response &&
          props.accountEmployeeKPIFinalState.detail.response.data &&
          props.accountEmployeeKPIFinalState.detail.response.data.items &&
          props.accountEmployeeKPIFinalState.detail.response.data.items }
      />
    }
  </PreviewPage>
);