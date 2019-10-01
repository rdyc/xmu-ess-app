import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { IEmployeeLevelDetail } from '@lookup/classes/response';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { EmployeeLevelDetailProps } from './LookupEmployeeLevelDetail';
import { LookupEmployeeLevelInformation } from './LookupEmployeeLevelInformation';

export const LookupEmployeeLevelDetailView: React.SFC<EmployeeLevelDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupEmployeeLevel,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/employeelevels',
      title: props.intl.formatMessage(lookupMessage.employeeLevel.page.detailTitle),
      description: props.intl.formatMessage(lookupMessage.employeeLevel.page.detailSubHeader),
    }}
    state={props.employeeLevelState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IEmployeeLevelDetail) => ([
      <LookupEmployeeLevelInformation data={data}/>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="lookup-employee-level-option"
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
      onSubmit={props.handleDelete} 
      onSubmitSuccess={props.handleDeleteSuccess}
      onSubmitFail={props.handleDeleteFail}
    />
  </PreviewPage>
);
