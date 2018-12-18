import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupLeave } from '@lookup/classes/response';
import { LookupLeaveField, LookupLeaveUserAction } from '@lookup/classes/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LookupLeaveSummary } from '../detail/shared/LookupLeaveSummary';
import { LookupLeaveFilter } from './LookupLeaveFilter';
import { LeaveListProps } from './LookupLeaveList';

const config: CollectionConfig<ILookupLeave, LeaveListProps> = {
  // page info
  page: (props: LeaveListProps) => ({
    uid: AppMenu.LookupLeave,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.leave.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.leave.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(LookupLeaveField).map(key => ({
    value: key,
    name: LookupLeaveField[key]
  })),
  // fieldTranslator: ,

  // searching
  hasSearching: true,
  searchStatus: (props: LeaveListProps): boolean => {
    let result: boolean = false;

    const { request } = props.lookupLeaveState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: LeaveListProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: LookupLeaveUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: LookupLeaveUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/lookup/leave/form`)
    },
    {
      id: LookupLeaveUserAction.Calculation,
      name: props.intl.formatMessage(layoutMessage.action.calculation),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/lookup/calculation`)
    }
  ]),

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },
  // events
  onDataLoad: (props: LeaveListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.lookupLeaveState.all;
    const { loadAllRequest } = props.lookupLeaveDispatch;
    
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
  onUpdated: (props: LeaveListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.lookupLeaveState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ILookupLeave, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.company ? item.company.name : 'N/A',
    quaternary: item.allocation.toString(),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName || '?',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler) => (
    <LookupLeaveFilter handleFind={callback.handleFilter}/>
  ),
  
  // summary component
  summaryComponent: (item: ILookupLeave) => ( 
    <LookupLeaveSummary data={item} />
  ),

  // action component
  actionComponent: (item: ILookupLeave, callback: CollectionHandler, props: LeaveListProps) => (
    <React.Fragment>
      <Button
        size="small"
        onClick={() => props.handleOnDelete(item.uid, callback.handleForceReload)}
      >
        <FormattedMessage {...layoutMessage.action.delete}/>        
      </Button>
      <Button 
          size="small"
          onClick={() => callback.handleRedirectTo(`/lookup/leave/form`, { uid: item.uid })}
        >
          <FormattedMessage {...layoutMessage.action.modify}/>
        </Button>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/leave/${item.uid}`, { companyUid: item.companyUid })}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  ),
};

export const LookupLeaveListView: React.SFC<LeaveListProps> = props => (
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