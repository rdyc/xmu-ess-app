import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseField, PurchaseUserAction } from '@purchase/classes/types';
import { PurchaseRequestFilter } from '@purchase/components/purchaseRequest/detail/shared/PurchaseRequestFilter';
import { PurchaseSummary } from '@purchase/components/purchaseRequest/detail/shared/PurchaseSummary';
import { purchaseRequestFieldTranslator } from '@purchase/helper';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { PurchaseApprovalListProps } from './PurchaseApprovalList';

const config: CollectionConfig<IPurchase, PurchaseApprovalListProps> = {
  // page info
  page: (props: PurchaseApprovalListProps) => ({
  uid: AppMenu.PurchaseApproval,
  parentUid: AppMenu.Purchase,
  title: props.intl.formatMessage(purchaseMessage.approval.pages.listTitle),
  description: props.intl.formatMessage(purchaseMessage.approval.pages.listSubHeader),
  }),

  // top bar
  fields: Object.keys(PurchaseField)
  .map(key => ({
    value: key,
    name: PurchaseField[key]
  })),
  fieldTranslator: purchaseRequestFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (states: PurchaseApprovalListProps): boolean => {
    let result: boolean = false;

    const { request } = states.purchaseApprovalState.all;

    if (request && request.filter && request.filter['query.find']) {
      result = request.filter['query.find'] ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: PurchaseApprovalListProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: PurchaseUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
  ]),

  // events
  onDataLoad: (states: PurchaseApprovalListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.purchaseApprovalState.all;
    const { loadAllRequest } = states.purchaseApprovalDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: user.company.uid ? user.company.uid : '',
            positionUid: user.position.uid ? user.position.uid : '',
            customerUid: states.customerUid,
            status: 'pending',
            'query.find': params.find,
            'query.findBy': params.findBy,
            'query.orderBy': params.orderBy,
            'query.direction': params.direction,
            'query.page': params.page,
            'query.size': params.size,
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: PurchaseApprovalListProps, callback: CollectionHandler) => {
    const { isLoading, response } = states.purchaseApprovalState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IPurchase, index: number, props: PurchaseApprovalListProps) => ({
    key: index,
    primary: item.uid,
    secondary: item.projectUid || item.project && item.project.name || '',
    tertiary: item.customer && item.customer.name || item.customerUid || '',
    quaternary: item.requestIDR && `${props.intl.formatNumber(item.requestIDR, GlobalFormat.CurrencyDefault)}` || '',
    quinary: item.status && item.status.value || item.statusType || '',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler, props: PurchaseApprovalListProps) => (
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
      <Button 
        size= "small"
        onClick = {() => callback.handleRedirectTo(`/purchase/approvals/${item.uid}`)}
      >
        <FormattedMessage { ...layoutMessage.action.details } />
      </Button>
    </React.Fragment>
  ),
};

export const PurchaseApprovalListView: React.SFC<PurchaseApprovalListProps> = props => (
  <CollectionPage
    config= { config }
    connectedProps = { props }
  />
);