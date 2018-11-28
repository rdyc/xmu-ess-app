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
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { ILookupHoliday } from '@lookup/classes/response';
import { LookupHolidayField, LookupHolidayUserAction } from '@lookup/classes/types';
import { WithLookupHoliday, withLookupHoliday } from '@lookup/hoc/withLookupHoliday';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { LookupHolidaySummary } from '../detail/shared/LookupHolidaySummary';

const config: CollectionConfig<ILookupHoliday, AllProps> = {
  // page
  page: (props: AllProps) => ({
    uid: AppMenu.LookupHoliday,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(leaveMessage.request.page.listTitle),
    description: props.intl.formatMessage(leaveMessage.request.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(LookupHolidayField)
    .map(key => ({ 
      value: key, 
      name: LookupHolidayField[key] 
    })),

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
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
  moreOptions: (props: AllProps, callback: CollectionHandler): IAppBarMenu[] => ([
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

  // events
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.lookupHolidayState.all;
    const { loadAllRequest } = props.lookupHolidayDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            find: 'CP002',
            findBy: 'companyUid',
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
    const { isLoading, response } = props.lookupHolidayState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ILookupHoliday, index: number) => ({
    key: index,
    primary: item.description ? item.description : 'N/A',
    secondary: item.companyUid,
    tertiary: item.date,
    quaternary: item.uid,
    quinary: 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ILookupHoliday) => ( 
    <LookupHolidaySummary data={item} />
  ),

  // action component
  actionComponent: (item: ILookupHoliday, callback: CollectionHandler) => (
    <React.Fragment>
      {}
        <Button 
          size="small"
          onClick={() => callback.handleRedirectTo(`/lookup/holiday/form`, { uid: item.uid })}
        >
          <FormattedMessage {...layoutMessage.action.modify}/>
        </Button>
      }

      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/holiday/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  )
};

type AllProps 
  = WithUser
  & WithLookupHoliday
  & InjectedIntlProps;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const LookupHolidayList = compose(
  withUser,
  withLookupHoliday,
  injectIntl
)(listView);