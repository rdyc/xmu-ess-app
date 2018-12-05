import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ICustomer } from '@lookup/classes/response';
import { LookupCustomerField } from '@lookup/classes/types/customer/LookupCustomerField';
import { LookupCustomerUserAction } from '@lookup/classes/types/customer/LookupCustomerUserAction';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { LookupCustomerSummary } from '../detail/shared/LookupCustomerSummary';
import { LookupCustomerFilter } from './LookupCustomerFilter';

const config: CollectionConfig<ICustomer, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.LookupCustomer,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.lookupCustomer.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.lookupCustomer.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(LookupCustomerField).map(key => ({
    value: key,
    name: LookupCustomerField[key]
  })),

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.lookupCustomerState.all;

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
      id: LookupCustomerUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: LookupCustomerUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/lookup/customer/form`)
    }
  ]),

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },
  // events
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.lookupCustomerState.all;
    const { loadAllRequest } = props.lookupCustomerDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            direction: params.direction,
            orderBy: params.orderBy,
            page: params.page,
            size: params.size,
            find: params.find,
            findBy: params.findBy,
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (props: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.lookupCustomerState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ICustomer, index: number, props: AllProps) => ({
    key: index,
    primary: item.name,
    secondary: item.npwp ? item.npwp : 'N/A',
    tertiary: item.phone ? item.phone : (item.phoneAdditional ? item.phoneAdditional : 'N/A'),
    quaternary: item.company && item.company.name || item.companyUid,
    quinary: item.email ? item.email : 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler) => (
    <LookupCustomerFilter handleFind={callback.handleFilter}/>
  ),

  // summary component
  summaryComponent: (item: ICustomer) => ( 
    <LookupCustomerSummary data={item} />
  ),

  // action component
  actionComponent: (item: ICustomer, callback: CollectionHandler) => (
    <React.Fragment>
      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/customer/form`, { uid: item.uid, companyUid: item.companyUid })}
      >
        <FormattedMessage {...layoutMessage.action.modify} />
      </Button>

      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/customer/${item.uid}`, {companyUid: item.companyUid})}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  ),
};

type AllProps
  = WithLookupCustomer
  & WithUser
  & InjectedIntlProps;

const lookupCustomerList: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const LookupCustomerList = compose(
  withUser,
  injectIntl,
  withLookupCustomer
)(lookupCustomerList);