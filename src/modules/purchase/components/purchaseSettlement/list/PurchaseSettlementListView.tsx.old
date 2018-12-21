import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import { ISettlement } from '@purchase/classes/response/purchaseSettlement';
import { PurchaseUserAction, SettlementField } from '@purchase/classes/types';
import { isSettlementEditable, isSettleReady, purchaseSettlementFieldTranslator } from '@purchase/helper';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { PurchaseSettlementFilter } from '../detail/shared/PurchaseSettlementFilter';
import { SettlementSummary } from '../detail/shared/SettlementSummary';
import { PurchaseSettlementListProps } from './PurchaseSettlementList';

const config: CollectionConfig<ISettlement, PurchaseSettlementListProps> = {
  // page info
  page: (props: PurchaseSettlementListProps) => ({
  uid: AppMenu.PurchaseSettlementRequest,
  parentUid: AppMenu.Purchase,
  title: props.intl.formatMessage(purchaseMessage.settlement.pages.listTitle),
  description: props.intl.formatMessage(purchaseMessage.settlement.pages.listSubHeader),
  }),

  // top bar
  fields: Object.keys(SettlementField).map(key => ({
    value: key,
    name: SettlementField[key]
  })),
  fieldTranslator: purchaseSettlementFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (states: PurchaseSettlementListProps): boolean => {
    let result: boolean = false;

    const { request } = states.purchaseSettlementState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: PurchaseSettlementListProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: PurchaseUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
  ]),

  // events
  onDataLoad: (states: PurchaseSettlementListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.purchaseSettlementState.all;
    const { loadAllRequest } = states.purchaseSettlementDispatch;

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
  onUpdated: (states: PurchaseSettlementListProps, callback: CollectionHandler) => {
    const { isLoading, response } = states.purchaseSettlementState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ISettlement, index: number, props: PurchaseSettlementListProps) => ({
    key: index,
    primary: item.uid,
    secondary: item.projectUid || item.project && item.project.name || '',
    tertiary: item.customer && item.customer.name || item.customerUid || '',
    quaternary: item.actualInIDR && `${props.intl.formatNumber(item.actualInIDR, GlobalFormat.CurrencyDefault)}` || '',
    quinary: item.status && item.status.value || item.statusType || props.intl.formatMessage(purchaseMessage.action.settle),
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler) => (
    <PurchaseSettlementFilter handleFind={callback.handleFilter} />
  ),

  // summary component
  summaryComponent: (item: ISettlement) => (
    <SettlementSummary data = {item} />
    ),

  // action component
  actionComponent: (item: ISettlement, callback: CollectionHandler) => (
    <React.Fragment>
      {
        isSettleReady(item.statusType) &&
        <Button
          size="small"
          onClick={() => callback.handleRedirectTo(`/purchase/settlement/requests/form`, { uid: item.uid, statusType: item.statusType})}
        >
          <FormattedMessage {...purchaseMessage.action.settle} />
        </Button>
      }
      {
        isSettlementEditable(item.statusType ? item.statusType : '') &&
        <Button
          size="small"
          onClick={() => callback.handleRedirectTo(`/purchase/settlement/requests/form`, { uid: item.uid, statusType: item.statusType})}
        >
          <FormattedMessage {...layoutMessage.action.modify} />
        </Button>
      }
      {
        item.statusType && 
        <Button
          size="small"
          onClick={() => callback.handleRedirectTo(`/purchase/settlement/requests/${item.uid}`)}
        >
          <FormattedMessage {...layoutMessage.action.details} />
        </Button>
      }
      
    </React.Fragment>
  ),
};

export const PurchaseSettlementListView: React.SFC<PurchaseSettlementListProps> = props => (
  <CollectionPage
    config= { config }
    connectedProps = { props }
  />
);