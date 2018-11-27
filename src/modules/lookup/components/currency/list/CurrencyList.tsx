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
import { ICurrency } from '@lookup/classes/response/currency';
import { CurrencyField, CurrencyUserAction } from '@lookup/classes/types';
import { CurrencySummary } from '@lookup/components/currency/detail/shared/CurrencySummary';
import { currencyFieldTranslator } from '@lookup/helper';
import { withLookupCurrency, WithLookupCurrency } from '@lookup/hoc/currency/withLookupCurrency';
import { Button } from '@material-ui/core';
// import { currencyMessage } from '@lookup/locales/messages/currency/currencyMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const purchaseFields: ICollectionValue[] = Object.keys(CurrencyField).map(key => ({ 
  value: key, 
  name: CurrencyField[key] 
}));

const config: CollectionConfig<ICurrency, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.PurchaseRequest,
    parentUid: AppMenu.Purchase,
    // title: props.intl.formatMessage(currencyMessage.request.pages.listTitle),
    // description: props.intl.formatMessage(currencyMessage.request.pages.listSubHeader),
  }),

  // top bar
  fields: purchaseFields,
  fieldTranslator: currencyFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (states: AllProps): boolean => {
    let result: boolean = false;

    const { request } = states.currencyState.all;

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
      id: CurrencyUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: CurrencyUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo('/lookup/currency/form'),
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
  onBind: (item: ICurrency, index: number) => ({
    key: index,
    primary: `${item.symbol}` ||  '',
    secondary: `${item.rate}` || '',
    tertiary: '',
    quaternary: '',
    quinary: item.uid || '',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ICurrency) => (
    <CurrencySummary data = {item} />
    ),

  // action component
  actionComponent: (item: ICurrency, callback: CollectionHandler) => (
    <React.Fragment>
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
  & WithLookupCurrency;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config= { config }
    connectedProps = { props }
  />
);

export const PurchaseRequestList = compose(
  withUser,
  injectIntl,
  withLookupCurrency
)(listView);