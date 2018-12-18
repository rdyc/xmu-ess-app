import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ICurrencyDetail } from '@lookup/classes/response/currency';
import { CurrencyUserAction } from '@lookup/classes/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { DeleteForm } from '../editor/DeleteForm';
import { CurrencyDetailProps } from './CurrencyDetail';
import { CurrencyInformation } from './shared/CurrencyInformation';

const config: SingleConfig<ICurrencyDetail, CurrencyDetailProps> = {
  // page info
  page: (props: CurrencyDetailProps) => ({
    uid: AppMenu.LookupCurrency,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.currency.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.currency.page.detailSubHeader)
  }),

  // parent url
  parentUrl: (props: CurrencyDetailProps) => '/lookup/currencies',

  // action centre
  showActionCentre: true,
  
  // more
  hasMore: true,
  moreOptions: (props: CurrencyDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: CurrencyUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    },
    {
      id: CurrencyUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: props.handleOnModify
    },
    {
      id: CurrencyUserAction.Delete,
      name: props.intl.formatMessage(layoutMessage.action.delete),
      enabled: true,
      visible: true,
      onClick: props.handleOnDelete
    }
  ]),
  onDataLoad: (props: CurrencyDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.lookupCurrencyState.detail;
    const { loadDetailRequest } = props.lookupCurrencyDispatch;

    // when user is set and not loading and has purchaseUid in route params
    if (user && !isLoading && props.match.params.currencyUid) {
      // when purchaseUid was changed or response are empty or force to reload
      if ((request && request.currencyUid !== props.match.params.currencyUid) || !response || forceReload) {
        loadDetailRequest({
          currencyUid: props.match.params.currencyUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType('');
      }
    }
  },
  onUpdated: (states: CurrencyDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.lookupCurrencyState.detail;

    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType('');
    }
  },

  // primary
  primaryComponent: (data: ICurrencyDetail, props: CurrencyDetailProps) => (
    <CurrencyInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ICurrencyDetail, props: CurrencyDetailProps) => ([
    //
  ])
};

export const CurrencyDetailView: React.SFC<CurrencyDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
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
  </SinglePage>
);