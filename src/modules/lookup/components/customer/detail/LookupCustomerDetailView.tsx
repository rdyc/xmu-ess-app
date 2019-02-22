import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { ICustomerDetail } from '@lookup/classes/response';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { LookupCustomerDetailProps } from './LookupCustomerDetail';
import { LookupCustomerInformation } from './shared/LookupCustomerInformation';

export const LookupCustomerDetailView: React.SFC<LookupCustomerDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupCustomer,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/customer/list',
      title: props.intl.formatMessage(lookupMessage.customer.page.detailTitle),
      description: props.intl.formatMessage(lookupMessage.customer.page.detailSubHeader),
    }}
    options={props.pageOptions}
    state={props.lookupCustomerState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ICustomerDetail) => (
      <LookupCustomerInformation data={data} />
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
      onSubmit={props.handleSubmit}
      onSubmitSuccess={props.handleSubmitSuccess}
      onSubmitFail={props.handleSubmitFail}
    />
  </PreviewPage>
);
