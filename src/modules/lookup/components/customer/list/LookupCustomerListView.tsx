import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ICustomer } from '@lookup/classes/response';
import { LookupCustomerField } from '@lookup/classes/types/customer/LookupCustomerField';
import { LookupCustomerUserAction } from '@lookup/classes/types/customer/LookupCustomerUserAction';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LookupCustomerSummary } from '../detail/shared/LookupCustomerSummary';
import { LookupCustomerFilter } from './LookupCustomerFilter';
import { LookupCustomerListProps } from './LookupCustomerList';

const config: CollectionConfig<ICustomer, LookupCustomerListProps> = {
  // page info
  page: (props: LookupCustomerListProps) => ({
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
  searchStatus: (props: LookupCustomerListProps): boolean => {
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
  moreOptions: (props: LookupCustomerListProps, callback: CollectionHandler): IAppBarMenu[] => ([
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
  onDataLoad: (props: LookupCustomerListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
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
  onUpdated: (props: LookupCustomerListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.lookupCustomerState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ICustomer, index: number, props: LookupCustomerListProps) => ({
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
    <LookupCustomerFilter handleFind={callback.handleFilter} />
  ),

  // summary component
  summaryComponent: (item: ICustomer) => (
    <LookupCustomerSummary data={item} />
  ),

  // action component
  actionComponent: (item: ICustomer, callback: CollectionHandler, props: LookupCustomerListProps) => (
    <React.Fragment>
      <Button
        size="small"
        onClick={() => props.handleOnDelete(item.uid, callback.handleForceReload)}
      >
        <FormattedMessage {...layoutMessage.action.delete} />
      </Button>
      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/customer/form`, { uid: item.uid, companyUid: item.companyUid })}
      >
        <FormattedMessage {...layoutMessage.action.modify} />
      </Button>

      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/customer/${item.uid}`, { companyUid: item.companyUid })}
      >
        <FormattedMessage {...layoutMessage.action.details} />
      </Button>
    </React.Fragment>
  ),
};

export const lookupCustomerListView: React.SFC<LookupCustomerListProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  >
    <DialogConfirmation
      isOpen={props.dialogOpen}
      fullScreen={props.dialogFullScreen}
      title={props.dialogTitle}
      content={props.dialogContent}
      labelCancel={props.dialogCancelLabel}
      labelConfirm={props.dialogConfirmLabel}
      onClickCancel={props.handleOnCloseDialog}
      onClickConfirm={props.handleSubmit}
    />
  </CollectionPage>
);