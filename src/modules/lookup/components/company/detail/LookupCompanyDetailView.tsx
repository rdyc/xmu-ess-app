import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { ICompanyDetail } from '@lookup/classes/response/company';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { CompanyDetailProps } from './LookupCompanyDetail';
import { CompanyInformation } from './shared/LookupCompanyInformation';

export const LookupCompanyDetailView: React.SFC<CompanyDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupCompany,
      parentUid: AppMenu.Lookup,
      title: props.intl.formatMessage(lookupMessage.company.page.detailTitle),
      description: props.intl.formatMessage(lookupMessage.company.page.detailSubHeader),
    }}
    options={props.pageOptions}
    state={props.lookupCompanyState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ICompanyDetail) => (
      <CompanyInformation data={data}/>
    )}
    secondary={() => ([
      //
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
      onSubmit={props.handleDelete} 
      onSubmitSuccess={props.handleDeleteSuccess}
      onSubmitFail={props.handleDeleteFail}
    />
  </PreviewPage>
);
