import AppMenu from '@constants/AppMenu';
import { ICollectionValue } from '@layout/classes/core';
import { 
  CollectionConfig, 
  CollectionDataProps, 
  CollectionHandler,
  CollectionPage,
  CollectionPageProps } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseField, PurchaseUserAction } from '@purchase/classes/types';
import { PurchaseSummary } from '@purchase/components/purchaseRequest/detail/shared/PurchaseSummary';
import { purchaseRequestFieldTranslator } from '@purchase/helper';
import { withPurchaseApproval, WithPurchaseApproval } from '@purchase/hoc/purchaseHistories/withPurchaseApproval';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const purchaseFields: ICollectionValue[] = Object.keys(PurchaseField).map(key => ({ 
  value: key, 
  name: PurchaseField[key] 
}));

const menuOptions = (props: CollectionPageProps): IAppBarMenu[] => ([
  {
    id: PurchaseUserAction.Refresh,
    name: props.intl.formatMessage(layoutMessage.action.refresh),
    enabled: true,
    visible: true,
    onClick: () => props.setForceReload(true)
  },
]);

const config: CollectionConfig<IPurchase, AllProps> = {
  // page info
  uid: AppMenu.PurchaseApproval,
  parentUid: AppMenu.Purchase,
  // title: intl.formatMessage({ id: 'purchase.title' }),
  // description: intl.formatMessage({ id: 'purchase.subTitle' }),
  title: 'Purchase Request Approval',
  description: 'Lorem ipsum.',

  // top bar
  fields: purchaseFields,
  fieldTranslator: purchaseRequestFieldTranslator,

  // selection
  hasSelection: false,
  // selectionProcessing: (values: string[]) => {
  //   alert(values.toString());
  // },

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
  moreOptions: menuOptions,

  // redirection
  hasRedirection: true,
  onRedirect: (item: IPurchase): string => {
    return `/purchase/approvals/details/${item.uid}`;
  },

  // data filter
  filter: {
    orderBy: 'settlementStatusType',
    direction: 'descending'
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

    callback.setLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IPurchase, index: number) => ({
    key: index,
    primary: item.notes || item.reason || '',
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
  actionComponent: (item: IPurchase) => (
    <Button 
      size= "small"
      // onClick = {() => alert(`go to ${item.uid}`)}
      onClick = {() => alert(`go to ${item.uid}`)}
    >
      <FormattedMessage { ...layoutMessage.action.details } />
    </Button>
  ),

  // custom row render: uncomment to see different
  // onRowRender: (item: IPurchase, index: number) => (
  //   <div key={index}>{item.name}</div>
  // )
};

type AllProps
  = WithUser
  & InjectedIntlProps
  & WithPurchaseApproval;

const purchaseApprovalCollectionPage: React.SFC<AllProps> = props => (
  <CollectionPage
    config= { config }
    connectedProps = { props }
  />
);

export const PurchaseApprovalCollectionPage = compose(
  withUser,
  injectIntl,
  withPurchaseApproval
)(purchaseApprovalCollectionPage);