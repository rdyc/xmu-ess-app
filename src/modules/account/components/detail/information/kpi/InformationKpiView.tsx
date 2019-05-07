import { IEmployeeMy } from '@account/classes/response';
import { AccountInformationTabs } from '@account/classes/types/AccountInformationTabs';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
import { TabInformation } from '../TabInformation';
import { InformationKpiProps } from './InformationKpi';
import { InformationKpiDetail } from './InformationKpiDetail';

export const InformationKpiView: React.SFC<InformationKpiProps> = props => (
  <TabInformation
    tab={AccountInformationTabs.kpi}
  >
    <PreviewPage 
      info={{
        uid: AppMenu.AccountInformation,
        parentUid: AppMenu.Account,
        parentUrl: '/account/information',
        title: props.intl.formatMessage(accountMessage.shared.page.informationTitle, { state: 'Employee'}),
        description: props.intl.formatMessage(accountMessage.shared.page.informationTitle),
      }}
      state={props.accountEmployeeMyState.detail}
      onLoadApi={props.handleOnLoadApi}
      primary={(data: IEmployeeMy) => ([
        <InformationKpiDetail data={data} />
      ])}
      // secondary={(data: IMileageRequestDetail) => ([
      //   <MileageItem items={data.items}/>
      // ])}
      // tertiary={(data: IMileageRequestDetail) => ([
      //   <TimesheetItem data={data.timesheets} />,
      //   <WorkflowHistory data={data.workflow} />
      // ])}
      appBarComponent={
        props.menuOptions &&
        <PopupMenu
          id="account-information-option"
          selectable={false}
          menuOptions={props.menuOptions}
          onSelected={props.handleOnSelectedMenu}
        />
      }
    />
  </TabInformation>
);