import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ISystemLimit } from '@lookup/classes/response';
import { SystemLimitField, SystemLimitUserAction } from '@lookup/classes/types';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { LookupSystemLimitFilter } from './LookupSystemLimitFilter';
import { LookupSystemLimitSummary } from './LookupSystemLimitSummary';

const config: CollectionConfig<ISystemLimit, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.LookupSystemLimit,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.systemLimit.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.systemLimit.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(SystemLimitField).map(key => ({
    value: key,
    name: SystemLimitField[key]
  })),
  // fieldTranslator: ,

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.systemLimitState.all;

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
      id: SystemLimitUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: SystemLimitUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/lookup/systemlimits/form`)
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
    const { isLoading, response } = props.systemLimitState.all;
    const { loadAllRequest } = props.systemLimitDispatch;
    
    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            find: params.find,
            findBy: params.findBy,
            direction: params.direction,
            orderBy: params.orderBy,
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
    const { isLoading, response } = props.systemLimitState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ISystemLimit, index: number, props: AllProps) => ({
    key: index,
    primary: item.uid,
    secondary: item.company.name,
    tertiary: item.category ? item.category.value : 'N/A',
    quaternary: item.days.toString(),
    quinary: item.category ? item.category.description : 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler) => (
    <LookupSystemLimitFilter handleFind={callback.handleFilter}/>
  ),
  
  // summary component
  summaryComponent: (item: ISystemLimit) => ( 
    <LookupSystemLimitSummary data={item} />
  ),

  // action component
  actionComponent: (item: ISystemLimit, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
          size="small"
          onClick={() => callback.handleRedirectTo(`/lookup/systemlimits/form`, { uid: item.uid })}
        >
          <FormattedMessage {...layoutMessage.action.modify}/>
        </Button>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/systemlimits/${item.uid}`, { companyUid: item.companyUid })}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  ),
};

type AllProps
  = WithUser
  & InjectedIntlProps
  & WithLookupSystemLimit;

const systemLimitList: React.SFC<AllProps> = props => (
  <React.Fragment>
    <CollectionPage
      config={config}
      connectedProps={props}
    />
  </React.Fragment>
);

export const LookupSystemLimitListView = compose(
  withUser,
  injectIntl,
  withLookupSystemLimit,
)(systemLimitList);