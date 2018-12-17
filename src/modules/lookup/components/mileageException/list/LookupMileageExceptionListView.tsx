import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IMileageException } from '@lookup/classes/response';
import { MileageExceptionField, MileageExceptionUserAction } from '@lookup/classes/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LookupMileageExceptionFilter } from './LookupMileageExceptionFilter';
import { LookupMileageExceptionListProps } from './LookupMileageExceptionList';
import { LookupMileageExceptionSummary } from './LookupMileageExceptionSummary';

const config: CollectionConfig<IMileageException, LookupMileageExceptionListProps> = {
  // page info
  page: (props: LookupMileageExceptionListProps) => ({
    uid: AppMenu.LookupMileageException,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.mileageException.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.mileageException.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(MileageExceptionField).map(key => ({
    value: key,
    name: MileageExceptionField[key]
  })),
  // fieldTranslator: mileageRequestFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (props: LookupMileageExceptionListProps): boolean => {
    let result: boolean = false;

    const { request } = props.mileageExceptionState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: LookupMileageExceptionListProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: MileageExceptionUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: MileageExceptionUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/lookup/mileageexceptions/form`)
    }
  ]),

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },
  // events
  onDataLoad: (props: LookupMileageExceptionListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.mileageExceptionState.all;
    const { loadAllRequest } = props.mileageExceptionDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: props.companyUid,
            roleUid: props.roleUid,
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
  onUpdated: (props: LookupMileageExceptionListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.mileageExceptionState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IMileageException, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.role && item.role.company && item.role.company.name,
    tertiary: item.role.name,
    quaternary: item.reason ? item.reason : 'N/A',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler, props: LookupMileageExceptionListProps) => (
    <LookupMileageExceptionFilter 
      handleChangeFilter={props.handleChangeFilter}
      callbackForceReload={callback.handleForceReload}
    />
  ),
  
  // summary component
  summaryComponent: (item: IMileageException) => ( 
    <LookupMileageExceptionSummary data={item} />
  ),

  // action component
  actionComponent: (item: IMileageException, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
          size="small"
          onClick={() => callback.handleRedirectTo(`/lookup/mileageexceptions/form`, { uid: item.uid })}
        >
          <FormattedMessage {...layoutMessage.action.modify}/>
        </Button>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/mileageexceptions/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  ),
};

export const LookupMileageExceptionListView: React.SFC<LookupMileageExceptionListProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);