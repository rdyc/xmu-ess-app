import { IEmployeeRate } from '@account/classes/response/employeeRate';
import { AccountEmployeeTabs } from '@account/classes/types/AccountEmployeeTabs';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';
import { DetailPage } from '../DetailPage';
import { AccountEmployeeRateDetailProps } from './AccountEmployeeRateDetail';
import { AccountEmployeeRateInformation } from './AccountEmployeeRateInformation';

export const AccountEmployeeRateDetailView: React.SFC<AccountEmployeeRateDetailProps> = props => {

  const render = (
    <DetailPage
        tab={AccountEmployeeTabs.rate}        
    >
      <PreviewPage
        info={{
          uid: AppMenu.Account,
          parentUid: AppMenu.Lookup,
          parentUrl: `/account/employee/`,
          title: props.intl.formatMessage(accountMessage.shared.page.detailTitle, { state: 'Rate'}),
          description: props.intl.formatMessage(accountMessage.shared.page.detailSubHeader),
        }}
        state={props.accountEmployeeRateState.current}
        onLoadApi={props.handleOnLoadApi}
        primary={(data: IEmployeeRate) => ([
          <AccountEmployeeRateInformation data={data} employeeUid={props.match.params.employeeUid}/>
        ])}
        appBarComponent={
          props.menuOptions &&
          <PopupMenu 
            id="employee-rate-option"
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
    </DetailPage>
  );

  return render;
};