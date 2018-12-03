import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ISystemLimit } from '@lookup/classes/response';
import { SystemLimitField, SystemLimitUserAction } from '@lookup/classes/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LookupSystemLimitFilter } from './LookupSystemLimitFilter';
import { SystemLimitListProps } from './LookupSystemLimitList';
import { LookupSystemLimitSummary } from './LookupSystemLimitSummary';

const config: CollectionConfig<ISystemLimit, SystemLimitListProps> = {
  // page info
  page: (props: SystemLimitListProps) => ({
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
  searchStatus: (props: SystemLimitListProps): boolean => {
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
  moreOptions: (props: SystemLimitListProps, callback: CollectionHandler): IAppBarMenu[] => ([
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
  onDataLoad: (props: SystemLimitListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
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
  onUpdated: (props: SystemLimitListProps, callback: CollectionHandler) => {
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
  actionComponent: (item: ISystemLimit, callback: CollectionHandler, props: SystemLimitListProps) => (
    <React.Fragment>
      <Button
        size="small"
        onClick={() => props.handleOnDelete(item.uid, callback.handleForceReload)}
      >
        <FormattedMessage {...layoutMessage.action.delete}/>        
      </Button>
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

export const LookupSystemLimitListView: React.SFC<SystemLimitListProps> = props => (
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