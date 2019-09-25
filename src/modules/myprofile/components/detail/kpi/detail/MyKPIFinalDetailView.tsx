import AppMenu from '@constants/AppMenu';
import { IKPIFinalDetail } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

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
    state={props.kpiFinalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPIFinalDetail) => ([
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
      !props.kpiFinalState.detail.isLoading &&
      <MyKPIFinalItem 
        items={
          props.kpiFinalState.detail.response &&
          props.kpiFinalState.detail.response.data &&
          props.kpiFinalState.detail.response.data.items &&
          props.kpiFinalState.detail.response.data.items }
      />
    }
  </PreviewPage>
);