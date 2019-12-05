import { IKPIAssign } from '@account/classes/response/employeeKPIAssign';
import AppMenu from '@constants/AppMenu';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu/';
import * as React from 'react';

import { MyKPIAssignDetailProps } from './MyKPIAssignDetail';
import { MyKPIAssignInformation } from './shared/MyKPIAssignInformation';
import { MyKPIAssignItem } from './shared/MyKPIAssignItem';

export const MyKPIAssignDetailView: React.SFC<MyKPIAssignDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.MyProfile,
      parentUid: AppMenu.Account,
      parentUrl: `/account/profile/kpiassign`,
      title: props.intl.formatMessage(kpiMessage.employee.page.detailTitle),
      description: props.intl.formatMessage(kpiMessage.employee.page.detailSubHeader),
    }}
    state={props.accountEmployeeKPIAssignState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPIAssign) => ([
      <MyKPIAssignInformation data={data} />
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
      !props.accountEmployeeKPIAssignState.detail.isLoading &&
      <MyKPIAssignItem 
        items={
          props.accountEmployeeKPIAssignState.detail.response &&
          props.accountEmployeeKPIAssignState.detail.response.data &&
          props.accountEmployeeKPIAssignState.detail.response.data.items &&
          props.accountEmployeeKPIAssignState.detail.response.data.items }
        useSelect
      />
    }
  </PreviewPage>
);