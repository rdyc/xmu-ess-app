import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import { isRequestEditable } from '@organization/helper/isRequestEditable';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseField, PurchaseUserAction } from '@purchase/classes/types';
import { purchaseRequestFieldTranslator } from '@purchase/helper';
import { WithPurchaseRequest, withPurchaseRequest } from '@purchase/hoc/purchaseRequest/withPurchaseRequest';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { PurchaseRequestFilter } from '../detail/shared/PurchaseRequestFilter';
import { PurchaseSummary } from '../detail/shared/PurchaseSummary';

const config: CollectionConfig<IPurchase, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.PurchaseRequest,
    parentUid: AppMenu.Purchase,
    title: props.intl.formatMessage(purchaseMessage.request.pages.listTitle),
    description: props.intl.formatMessage(purchaseMessage.request.pages.listSubHeader),
  }),

  // top bar
  fields: Object.keys(PurchaseField).map(key => ({
    value: key,
    name: PurchaseField[key]
  })),
  fieldTranslator: purchaseRequestFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (states: AllProps): boolean => {
    let result: boolean = false;

    const { request } = states.purchaseRequestState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AllProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: PurchaseUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: PurchaseUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo('/purchase/requests/form'),
    }
  ]),
  
  // events
  onDataLoad: (states: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.purchaseRequestState.all;
    const { loadAllRequest } = states.purchaseRequestDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            find: params.find,
            findBy: params.findBy,
            orderBy: params.orderBy,
            direction: params.direction,
            page: params.page,
            size: params.size,
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = states.purchaseRequestState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IPurchase, index: number, props: AllProps) => ({
    key: index,
    primary: item.uid,
    secondary: item.projectUid || item.project && item.project.name || '',
    tertiary: item.customer && item.customer.name || item.customerUid || '',
    quaternary: item.requestIDR && `${props.intl.formatNumber(item.requestIDR, GlobalFormat.CurrencyDefault)}` || '',
    quinary: item.status && item.status.value || item.statusType || '',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler) => (
    <PurchaseRequestFilter handleFind={callback.handleFilter} />
  ),

  // summary component
  summaryComponent: (item: IPurchase) => (
    <PurchaseSummary data = {item} />
    ),

  // action component
  actionComponent: (item: IPurchase, callback: CollectionHandler) => (
    <React.Fragment>
      {
        isRequestEditable(item.statusType ? item.statusType : '') &&
        <Button
          size="small"
          onClick={() => callback.handleRedirectTo(`/purchase/requests/form`, { uid: item.uid } )}
        >
          <FormattedMessage {...layoutMessage.action.modify} />
        </Button>
      }
      {
        WorkflowStatusType.Approved === (item.statusType) &&
        <Button
          size="small"
          onClick={() => callback.handleRedirectTo(`/purchase/settlement/requests/form`, { uid: item.uid })}
        >
          <FormattedMessage {...purchaseMessage.action.settle} />
        </Button>
      }
    <Button 
      size= "small"
      onClick = {() => callback.handleRedirectTo(`/purchase/requests/${item.uid}`)}
    >
      <FormattedMessage { ...layoutMessage.action.details } />
    </Button>  
</React.Fragment>
  ),
};

type AllProps
  = WithUser
  & InjectedIntlProps
  & WithPurchaseRequest;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config= { config }
    connectedProps = { props }
  />
);

export const PurchaseRequestList = compose(
  withUser,
  injectIntl,
  withPurchaseRequest
)(listView);