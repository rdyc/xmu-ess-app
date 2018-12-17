import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ISystemLimit } from '@lookup/classes/response';
import { SystemLimitField, SystemLimitUserAction } from '@lookup/classes/types';
import { systemLimitFieldTranslator } from '@lookup/helper';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LookupSystemLimitFilter } from './LookupSystemLimitFilter';
import { LookupSystemLimitListProps } from './LookupSystemLimitList';
import { LookupSystemLimitSummary } from './LookupSystemLimitSummary';

const config: CollectionConfig<ISystemLimit, LookupSystemLimitListProps> = {
  // page info
  page: (props: LookupSystemLimitListProps) => ({
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
  fieldTranslator: systemLimitFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (props: LookupSystemLimitListProps): boolean => {
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
  moreOptions: (props: LookupSystemLimitListProps, callback: CollectionHandler): IAppBarMenu[] => ([
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
  onDataLoad: (props: LookupSystemLimitListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.systemLimitState.all;
    const { loadAllRequest } = props.systemLimitDispatch;
    
    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: props.companyUid,
            categoryType: props.categoryType,
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
  onUpdated: (props: LookupSystemLimitListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.systemLimitState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ISystemLimit, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.company.name,
    tertiary: item.category ? item.category.value : 'N/A',
    quaternary: item.days.toString(),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler, props: LookupSystemLimitListProps) => (
    <LookupSystemLimitFilter 
      handleCompanyFilter={props.handleCompanyFilter}
      handleCategoryFilter={props.handleCategoryFilter}
      callbackForceReload={callback.handleForceReload}
    />
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

export const LookupSystemLimitListView: React.SFC<LookupSystemLimitListProps> = props => (
  <CollectionPage
      config={config}
      connectedProps={props}
  />
);