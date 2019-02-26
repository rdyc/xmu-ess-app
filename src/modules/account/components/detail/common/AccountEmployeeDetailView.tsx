import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import * as React from 'react';

import { IEmployeeDetail } from '@account/classes/response';
import { AccountEmployeeTabs } from '@account/classes/types/AccountEmployeeTabs';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { Delete } from '@lookup/components/shared/Delete';
import { DetailPage } from '../DetailPage';
import { AccountEmployeeBank } from './AccountEmployeeBank';
import { AccountEmployeeContact } from './AccountEmployeeContact';
import { AccountEmployeeDetailProps } from './AccountEmployeeDetail';
import { AccountEmployeeInformation } from './AccountEmployeeInformation';

export const AccountEmployeeDetailView: React.SFC<AccountEmployeeDetailProps> = props => {

  const render = (
  <React.Fragment>
    <DetailPage
      tab={AccountEmployeeTabs.detail}      
    >
      <PreviewPage
        info={{
          uid: AppMenu.LookupEmployee,
          parentUid: AppMenu.Lookup,
          parentUrl: '/account/employee',
          title: props.intl.formatMessage(accountMessage.shared.page.detailTitle, { state: 'Employee'}),
          description: props.intl.formatMessage(accountMessage.shared.page.detailSubHeader),
        }}
        options={props.pageOptions}
        state={props.accountEmployeeState.detail}
        onLoadApi={props.handleOnLoadApi}
        primary={(data: IEmployeeDetail) => (
          <AccountEmployeeInformation data={data} />
        )}
        secondary={(data: IEmployeeDetail) => ([
          <AccountEmployeeContact data={data}/>,
          <AccountEmployeeBank data={data}/> 
        ])}
      >
        <Delete 
          action={props.action}
          isOpenDialog={props.dialogOpen}
          title={props.dialogTitle}
          content={props.dialogContent}
          labelCancel={props.dialogCancelLabel}
          labelConfirm={props.dialogConfirmLabel}
          handleDialogOpen={props.handleOnOpenDialog}
          handleDialogClose={props.handleOnCloseDialog}
          handleDialogConfirmed={props.handleOnConfirm}
          onSubmit={props.handleSubmit} 
          onSubmitSuccess={props.handleSubmitSuccess}
          onSubmitFail={props.handleSubmitFail}
        />
      </PreviewPage>
    </DetailPage>
  </React.Fragment>
  );

  return render;
};