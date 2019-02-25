import { IEmployeeAccessHistory } from '@account/classes/response/employeeAccessHistory';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import * as React from 'react';
import { AccountEmployeeAccessHistoryDetailProps } from './AccountEmployeeAccessHistoryDetail';
import { AccountEmployeeAccessHistoryInformation } from './AccountEmployeeAccessHistoryInformation';

export const AccountEmployeeAccessHistoryDetailView: React.SFC<AccountEmployeeAccessHistoryDetailProps> = props => {

  const render = (
    <PreviewPage
      info={{
        uid: AppMenu.Account,
        parentUid: AppMenu.Lookup,
        parentUrl: `/account/employee/${props.match.params.employeeUid}/history`,
        title: props.intl.formatMessage(accountMessage.shared.page.detailTitle, { state: 'Employee'}),
        description: props.intl.formatMessage(accountMessage.shared.page.detailSubHeader),
      }}
      options={props.pageOptions}
      state={props.accountEmployeeAccessHistoryState.detail}
      onLoadApi={props.handleOnLoadApi}
      primary={(data: IEmployeeAccessHistory) => (
        <AccountEmployeeAccessHistoryInformation data={data} employeeUid={props.match.params.employeeUid}/>
      )}
    />
  );

  return render;
};