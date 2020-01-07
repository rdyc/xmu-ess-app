import { IEmployeeContract } from '@account/classes/response/employeeContract';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';
import { AccountEmployeeContractDetailProps } from './AccountEmployeeContractDetail';
import { AccountEmployeeContractInformation } from './AccountEmployeeContractInformation';

export const AccountEmployeeContractDetailView: React.SFC<AccountEmployeeContractDetailProps> = props => {

  const render = (
    <PreviewPage
      info={{
        uid: AppMenu.LookupEmployee,
        parentUid: AppMenu.Lookup,
        parentUrl: `/account/employee/${props.match.params.employeeUid}/contract`,
        title: props.intl.formatMessage(accountMessage.shared.page.detailTitle, { state: 'Employee'}),
        description: props.intl.formatMessage(accountMessage.shared.page.detailSubHeader),
      }}
      state={props.accountEmployeeContractState.detail}
      onLoadApi={props.handleOnLoadApi}
      primary={(data: IEmployeeContract) => ([
        <AccountEmployeeContractInformation data={data} employeeUid={props.match.params.employeeUid}/>
      ])}
      appBarComponent={
        props.menuOptions &&
        <PopupMenu 
          id="employee-contract-option"
          selectable={false}
          menuOptions={props.menuOptions} 
          onSelected={props.handleOnSelectedMenu} 
        />
      }
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
  );

  return render;
};