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
import { lookupMessage } from '@leave/locales/messages/leaveMessage';
import { ILookupLeave } from '@lookup/classes/response';
import { LookupLeaveField, LookupLeaveUserAction } from '@lookup/classes/types';
import { WithLookupLeave, withLookupLeave } from '@lookup/hoc/withLookupLeave';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { LookupLeaveSummary } from '../detail/shared/LookupLeaveSummary';

const config: CollectionConfig<ILookupLeave, AllProps> = {
  // page
  page: (props: AllProps) => ({
    uid: AppMenu.LookupLeave,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.request.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.request.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(LookupLeaveField)
    .map(key => ({ 
      value: key, 
      name: LookupLeaveField[key] 
    })),

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
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
  moreOptions: (props: AllProps, callback: CollectionHandler): IAppBarMenu[] => ([
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
    }
  ]),

  // events
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
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
    const { isLoading, response } = props.lookupLeaveState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ILookupLeave, index: number) => ({
    key: index,
    primary: item.name,
    secondary: item.company ? item.company.name : 'N/A',
    tertiary: item.category ? item.category.description : 'N/A',
    quaternary: item.uid,
    quinary: item.allocation.toString(),
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ILookupLeave) => ( 
    <LookupLeaveSummary data={item} />
  ),

  // action component
  actionComponent: (item: ILookupLeave, callback: CollectionHandler) => (
    <React.Fragment>
      {}
        <Button 
          size="small"
          onClick={() => callback.handleRedirectTo(`/lookup/leave/form`, { uid: item.uid })}
        >
          <FormattedMessage {...layoutMessage.action.modify}/>
        </Button>
      }

      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/L=leave/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  )
};

type AllProps 
  = WithUser
  & WithLookupLeave
  & InjectedIntlProps;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const LookupLeaveList = compose(
  withUser,
  withLookupLeave,
  injectIntl
)(listView);