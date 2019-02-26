import { IEmployeeTraining } from '@account/classes/response/employeeTraining';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';
import { AccountEmployeeTrainingDetailProps } from './AccountEmployeeTrainingDetail';
import { AccountEmployeeTrainingInformation } from './AccountEmployeeTrainingInformation';

export const AccountEmployeeTrainingDetailView: React.SFC<AccountEmployeeTrainingDetailProps> = props => {

  const render = (
    <PreviewPage
      info={{
        uid: AppMenu.Account,
        parentUid: AppMenu.Lookup,
        parentUrl: `/account/employee/${props.match.params.employeeUid}/training`,
        title: props.intl.formatMessage(accountMessage.shared.page.detailTitle, { state: 'Employee'}),
        description: props.intl.formatMessage(accountMessage.shared.page.detailSubHeader),
      }}
      options={props.pageOptions}
      state={props.accountEmployeeTrainingState.detail}
      onLoadApi={props.handleOnLoadApi}
      primary={(data: IEmployeeTraining) => (
        <AccountEmployeeTrainingInformation data={data} employeeUid={props.match.params.employeeUid}/>
      )}
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