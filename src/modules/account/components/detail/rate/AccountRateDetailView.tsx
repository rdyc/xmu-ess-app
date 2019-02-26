import { IEmployeeRate } from '@account/classes/response/employeeRate';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';
import { AccountEmployeeRateDetailProps } from './AccountEmployeeRateDetail';
import { AccountEmployeeRateInformation } from './AccountEmployeeRateInformation';

export const AccountEmployeeRateDetailView: React.SFC<AccountEmployeeRateDetailProps> = props => {

  const render = (
    <PreviewPage
      info={{
        uid: AppMenu.Account,
        parentUid: AppMenu.Lookup,
        parentUrl: `/account/employee/${props.match.params.employeeUid}/rate`,
        title: props.intl.formatMessage(accountMessage.shared.page.detailTitle, { state: 'Rate'}),
        description: props.intl.formatMessage(accountMessage.shared.page.detailSubHeader),
      }}
      options={props.pageOptions}
      state={props.accountEmployeeRateState.detail}
      onLoadApi={props.handleOnLoadApi}
      primary={(data: IEmployeeRate) => (
        <AccountEmployeeRateInformation data={data} employeeUid={props.match.params.employeeUid}/>
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