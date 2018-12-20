import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupHoliday } from '@lookup/classes/response';
import { LookupHolidayField, LookupHolidayUserAction } from '@lookup/classes/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LookupHolidaySummary } from '../detail/shared/LookupHolidaySummary';
import { LookupHolidayFilter } from './LookupHolidayFilter';
import { HolidayListProps } from './LookupHolidayList';

const config: CollectionConfig<ILookupHoliday, HolidayListProps> = {
  // page info
  page: (props: HolidayListProps) => ({
    uid: AppMenu.LookupHoliday,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.holiday.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.holiday.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(LookupHolidayField).map(key => ({
    value: key,
    name: LookupHolidayField[key]
  })),
  // fieldTranslator: ,

  // searching
  hasSearching: true,
  searchStatus: (props: HolidayListProps): boolean => {
    let result: boolean = false;

    const { request } = props.lookupHolidayState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: HolidayListProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: LookupHolidayUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: LookupHolidayUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/lookup/holiday/form`)
    }
  ]),

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },
  // events
  onDataLoad: (props: HolidayListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.lookupHolidayState.all;
    const { loadAllRequest } = props.lookupHolidayDispatch;
    
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
  onUpdated: (props: HolidayListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.lookupHolidayState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ILookupHoliday, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.company ? item.company.name : 'N/A',
    tertiary: item.description ? item.description : 'N/A',
    quaternary: item.date.toString(),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName || '?',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler) => (
    <LookupHolidayFilter handleFind={callback.handleFilter}/>
  ),
  
  // summary component
  summaryComponent: (item: ILookupHoliday) => ( 
    <LookupHolidaySummary data={item} />
  ),

  // action component
  actionComponent: (item: ILookupHoliday, callback: CollectionHandler, props: HolidayListProps) => (
    <React.Fragment>
      <Button 
          size="small"
          onClick={() => callback.handleRedirectTo(`/lookup/holiday/form`, { uid: item.uid })}
        >
          <FormattedMessage {...layoutMessage.action.modify}/>
        </Button>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/holiday/${item.uid}`, { companyUid: item.companyUid })}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  ),
};

export const LookupHolidayListView: React.SFC<HolidayListProps> = props => (
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