import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
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
import { MileageExceptionListProps } from './LookupMileageExceptionList';
import { LookupMileageExceptionSummary } from './LookupMileageExceptionSummary';

const config: CollectionConfig<IMileageException, MileageExceptionListProps> = {
  // page info
  page: (props: MileageExceptionListProps) => ({
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
  searchStatus: (props: MileageExceptionListProps): boolean => {
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
  moreOptions: (props: MileageExceptionListProps, callback: CollectionHandler): IAppBarMenu[] => ([
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
      onClick: props.handleOnCreate
    }
  ]),

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },
  // events
  onDataLoad: (props: MileageExceptionListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.mileageExceptionState.all;
    const { loadAllRequest } = props.mileageExceptionDispatch;

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
  onUpdated: (props: MileageExceptionListProps, callback: CollectionHandler) => {
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
  filterComponent: (callback: CollectionHandler) => (
    <LookupMileageExceptionFilter handleFind={callback.handleFilter}/>
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

export const LookupMileageExceptionListView: React.SFC<MileageExceptionListProps> = props => (
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
        onClickConfirm={props.handleOnConfirm}
      />
  </CollectionPage>
);