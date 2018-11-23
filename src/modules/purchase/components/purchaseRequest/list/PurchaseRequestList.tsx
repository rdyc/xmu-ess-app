import AppMenu from '@constants/AppMenu';
import { ICollectionValue } from '@layout/classes/core';
import { 
  CollectionConfig, 
  CollectionDataProps, 
  CollectionHandler,
  CollectionPage 
  } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseField, PurchaseUserAction } from '@purchase/classes/types';
import { PurchaseSummary } from '@purchase/components/purchaseRequest/detail/shared/PurchaseSummary';
import { isRequestEditable, purchaseRequestFieldTranslator } from '@purchase/helper';
import { withPurchaseRequest, WithPurchaseRequest } from '@purchase/hoc/purchaseRequest/withPurchaseRequest';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const purchaseFields: ICollectionValue[] = Object.keys(PurchaseField).map(key => ({ 
  value: key, 
  name: PurchaseField[key] 
}));

const config: CollectionConfig<IPurchase, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.PurchaseRequest,
    parentUid: AppMenu.Purchase,
    title: props.intl.formatMessage(purchaseMessage.request.pages.listTitle),
    description: props.intl.formatMessage(purchaseMessage.request.pages.listSubHeader),
  }),

  // top bar
  fields: purchaseFields,
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

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },

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
  onBind: (item: IPurchase, index: number) => ({
    key: index,
    primary: `${item.currency && item.currency.value} ${item.request}` ||  '',
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
      {
        isRequestEditable(item.statusType ? item.statusType : '') &&
        <Button
          size="small"
          onClick={() => callback.handleRedirectTo(`/purchase/requests/form`, { uid: item.uid } )}
        >
          <FormattedMessage {...layoutMessage.action.modify} />
        </Button>
      }
    <Button 
      size= "small"
      onClick = {() => callback.handleRedirectTo(`/purchase/requests/details/${item.uid}`)}
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