import AppMenu from '@constants/AppMenu';
import { 
  CollectionConfig, 
  CollectionDataProps, 
  CollectionHandler,
  CollectionPage 
  } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IPosition } from '@lookup/classes/response/';
import { PositionField, PositionUserAction } from '@lookup/classes/types';
import { PositionSummary } from '@lookup/components/position/detail/shared/PositionSummary';
import { positionFieldTranslator } from '@lookup/helper';
import { withLookupPosition, WithLookupPosition } from '@lookup/hoc/withLookupPosition';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<IPosition, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.LookupPosition,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.position.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.position.page.listTitle),
  }),

  // top bar
  fields: Object.keys(PositionField)
  .map(key => ({
    value: key,
    name: PositionField[key]
  })),
  fieldTranslator: positionFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (states: AllProps): boolean => {
    let result: boolean = false;

    const { request } = states.lookupPositionState.all;

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
      id: PositionUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: PositionUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo('/lookup/position/form'),
    }
  ]),
  
  // events
  onDataLoad: (states: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.lookupPositionState.all;
    const { loadAllRequest } = states.lookupPositionDispatch;

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
  onUpdated: (states: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = states.lookupPositionState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IPosition, index: number, props: AllProps) => ({
    key: index,
    primary: `${item.uid}` ||  '',
    secondary: `${item.company && item.company.name}` || '',
    tertiary: `${item.name}` || '',
    quaternary: item.isAllowMultiple ?
        props.intl.formatMessage(lookupMessage.position.field.isAllowed) :
        props.intl.formatMessage(lookupMessage.position.field.isNotAllowed)
    ,
    quinary: item.uid || '',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IPosition) => (
    <PositionSummary data = {item} />
    ),

  // action component
  actionComponent: (item: IPosition, callback: CollectionHandler) => (
    <React.Fragment>
    <Button 
      size= "small"
      onClick = {() => callback.handleRedirectTo(`/lookup/position/${item.uid}`)}
    >
      <FormattedMessage { ...layoutMessage.action.details } />
    </Button>  
</React.Fragment>
  ),
};

type AllProps
  = WithUser
  & InjectedIntlProps
  & WithLookupPosition;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config= { config }
    connectedProps = { props }
  />
);

export const PositionList = compose(
  withUser,
  injectIntl,
  withLookupPosition
)(listView);