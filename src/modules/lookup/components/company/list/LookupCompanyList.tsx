import AppMenu from '@constants/AppMenu';
import {
  CollectionConfig,
  CollectionDataProps,
  CollectionHandler,
  CollectionPage,
} from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ICompany } from '@lookup/classes/response';
import { CompanyField, CompanyUserAction } from '@lookup/classes/types';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { LookupCompanySumarry } from './LookupCompanySummary';

const config: CollectionConfig<ICompany, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.LookupCompany,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.company.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.company.page.listSubHeader),
  }),

  // top bar
  fields: Object.keys(CompanyField)
    .map(key => ({
      value: key,
      name: CompanyField[key]
    })),
  // fieldTranslator: timesheetEntryFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.lookupCompanyState.all;

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
      id: CompanyUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: CompanyUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => alert('go to new page here')
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
    const { isLoading, response } = props.lookupCompanyState.all;
    const { loadAllRequest } = props.lookupCompanyDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
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
  onUpdated: (props: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.lookupCompanyState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ICompany, index: number, props: AllProps) => ({
    key: index,
    primary: item.name,
    secondary: item.code,
    tertiary: '',
    quaternary: item.uid,
    quinary: '',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ICompany) => (
    <LookupCompanySumarry data={item} />
  ),

  // action component
  actionComponent: (item: ICompany, callback: CollectionHandler) => (
    <React.Fragment>
      <Button
        size="small"
        onClick= {() => alert('go to new page here')}
      >
        Delete
      </Button>
      
      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/company/form`, { uid: item.uid })}
      >
        <FormattedMessage {...layoutMessage.action.modify} />
      </Button>

      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/company/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details} />
      </Button>
    </React.Fragment>
  ),

};

type AllProps
  = WithUser
  & WithLookupCompany
  & InjectedIntlProps;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const LookupCompanyList = compose(
  withUser,
  withLookupCompany,
  injectIntl
)(listView);