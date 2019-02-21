import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { ICurrencyDetail } from '@lookup/classes/response/currency';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { DeleteForm } from '../editor/DeleteForm';
import { CurrencyDetailProps } from './CurrencyDetail';
import { CurrencyInformation } from './shared/CurrencyInformation';

export const CurrencyDetailView: React.SFC<CurrencyDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupCurrency,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/currencies',
      title: props.intl.formatMessage(lookupMessage.currency.page.detailTitle),
      description: props.intl.formatMessage(lookupMessage.currency.page.detailSubHeader)
    }}
    options={props.pageOptions}
    state={props.lookupCurrencyState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ICurrencyDetail) => (
      <CurrencyInformation data={data} />
    )}
    secondary={(data: ICurrencyDetail) => ([
      // 
    ])}
  >
    <React.Fragment>
      <DeleteForm
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
    </React.Fragment>
  </PreviewPage>
);