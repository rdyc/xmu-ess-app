// import { IEmployeeMy } from '@account/classes/response';
import { AccountInformationTabs } from '@account/classes/types/AccountInformationTabs';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { IAppUser } from '@layout/interfaces';
import * as React from 'react';
import { TabInformation } from '../TabInformation';
import { InformationPositionProps } from './InformationPosition';
import { InformationPositionDetail } from './InformationPositionDetail';

export const InformationPositionView: React.SFC<InformationPositionProps> = props => (
  <TabInformation
    tab={AccountInformationTabs.position}
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
      primary={(data: IAppUser) => ([
        <InformationPositionDetail data={props.userState.user} />
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