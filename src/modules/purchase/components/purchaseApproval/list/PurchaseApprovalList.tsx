import AppMenu from '@constants/AppMenu';
import { 
  CollectionConfig, 
  CollectionDataProps, 
  CollectionHandler,
  CollectionPage, } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseField, PurchaseUserAction } from '@purchase/classes/types';
import { PurchaseSummary } from '@purchase/components/purchaseRequest/detail/shared/PurchaseSummary';
import { isRequestEditable, purchaseRequestFieldTranslator } from '@purchase/helper';
import { withPurchaseApproval, WithPurchaseApproval } from '@purchase/hoc/purchaseHistories/withPurchaseApproval';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<IPurchase, AllProps> = {
  // page info
  page: (props: AllProps) => ({
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
  searchStatus: (states: AllProps): boolean => {
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
  moreOptions: (props: AllProps, callback: CollectionHandler): IAppBarMenu[] => ([
  {
    id: PurchaseUserAction.Refresh,
    name: props.intl.formatMessage(layoutMessage.action.refresh),
    enabled: true,
    visible: true,
    onClick: () => callback.handleForceReload()
  },
]),

  // data filter
  filter: {
    orderBy: 'requestStatusType',
    direction: 'ascending'
  },

  // events
  onDataLoad: (states: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.purchaseApprovalState.all;
    const { loadAllRequest } = states.purchaseApprovalDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: user.company.uid,
            positionUid: user.position.uid,
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
  onUpdated: (states: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = states.purchaseApprovalState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IPurchase, index: number, props: AllProps) => ({
    key: index,
    primary: `${item.currency && item.currency.value} ${props.intl.formatNumber(item.request || 0)}` || '',
    secondary: item.projectUid || item.project && item.project.name || '',
    tertiary: item.customer && item.customer.name || item.customerUid || '',
    quaternary: item.uid,
    quinary: item.status && item.status.value || item.statusType || '',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IPurchase) => (
    <PurchaseSummary data = {item} />
    ),

  // action component
  actionComponent: (item: IPurchase, callback: CollectionHandler) => (
    <React.Fragment>
    { isRequestEditable(item.statusType || '')
    ?
    <Button 
      size= "small"
      onClick = {() => callback.handleRedirectTo(`/purchase/approvals/${item.uid}`)}
    >
      <FormattedMessage { ...layoutMessage.action.approve } />
    </Button>
    :
    <Button 
      size= "small"
      onClick = {() => callback.handleRedirectTo(`/purchase/approvals/${item.uid}`)}
    >
      <FormattedMessage { ...layoutMessage.action.details } />
    </Button>
    }
      </React.Fragment>
  ),
};

type AllProps
  = WithUser
  & InjectedIntlProps
  & WithPurchaseApproval;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config= { config }
    connectedProps = { props }
  />
);

export const PurchaseApprovalList = compose(
  withUser,
  injectIntl,
  withPurchaseApproval
)(listView);