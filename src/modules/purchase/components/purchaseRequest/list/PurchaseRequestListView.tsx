import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import { isRequestEditable } from '@organization/helper/isRequestEditable';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseField, PurchaseUserAction } from '@purchase/classes/types';
import { purchaseRequestFieldTranslator } from '@purchase/helper';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { PurchaseRequestFilter } from '../detail/shared/PurchaseRequestFilter';
import { PurchaseSummary } from '../detail/shared/PurchaseSummary';
import { PurchaseRequestListProps } from './PurchaseRequestList';

const config: CollectionConfig<IPurchase, PurchaseRequestListProps> = {
  // page info
  page: (props: PurchaseRequestListProps) => ({
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
  searchStatus: (states: PurchaseRequestListProps): boolean => {
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
  moreOptions: (props: PurchaseRequestListProps, callback: CollectionHandler): IAppBarMenu[] => ([
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
  onDataLoad: (states: PurchaseRequestListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
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
            customerUid: states.customerUid,
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
  onUpdated: (states: PurchaseRequestListProps, callback: CollectionHandler) => {
    const { isLoading, response } = states.purchaseRequestState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IPurchase, index: number, props: PurchaseRequestListProps) => ({
    key: index,
    primary: item.uid,
    secondary: item.projectUid || item.project && item.project.name || '',
    tertiary: item.customer && item.customer.name || item.customerUid || '',
    quaternary: item.requestIDR && `${props.intl.formatNumber(item.requestIDR, GlobalFormat.CurrencyDefault)}` || '',
    quinary: item.status && item.status.value || item.statusType || '',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler, props: PurchaseRequestListProps) => (
    <PurchaseRequestFilter 
      handleFind={props.handleChangeFilter}
      callbackForceReload={callback.handleForceReload} />
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

export const PurchaseRequestListView: React.SFC<PurchaseRequestListProps> = props => (
  <CollectionPage
    config= { config }
    connectedProps = { props }
  />
);