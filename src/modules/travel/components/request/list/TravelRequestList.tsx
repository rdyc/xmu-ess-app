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
import { Button } from '@material-ui/core';
import { isModuleRequestEditable } from '@organization/helper/isModuleRequestEditable';
import { ITravelRequest } from '@travel/classes/response';
import { TravelRequestField, TravelUserAction } from '@travel/classes/types';
import { travelFieldTranslator } from '@travel/helper/travelFieldTranslator';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { TravelSummary } from '../detail/shared/TravelSummary';

const config: CollectionConfig<ITravelRequest, AllProps> = {
  // page
  page: (props: AllProps) => ({
    uid: AppMenu.TravelRequest,
    parentUid: AppMenu.Travel,
    title: props.intl.formatMessage(travelMessage.request.page.listTitle),
    description: props.intl.formatMessage(travelMessage.request.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(TravelRequestField)
    .map(key => ({ 
      value: key, 
      name: TravelRequestField[key] 
    })),
  fieldTranslator: travelFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (states: AllProps): boolean => {
    let result: boolean = false;

    const { request } = states.travelRequestState.all;

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
      id: TravelUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: TravelUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/travel/requests/form`)
    }
  ]),

  // events
  onDataLoad: (states: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.travelRequestState.all;
    const { loadAllRequest } = states.travelRequestDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            customerUid: undefined,
            isRejected: undefined,
            isSettlement: undefined,          
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
    const { isLoading, response } = states.travelRequestState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ITravelRequest, index: number, props: AllProps ) => ({
    key: index,
    primary: item.uid, 
    secondary: item.customer && item.customer.name || item.customerUid, 
    tertiary: item.objective ? item.objective : 'N/A',
    quaternary: props.intl.formatNumber(item.total),
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ITravelRequest) => ( 
    <TravelSummary data={item} />
  ),

  // action component
  actionComponent: (item: ITravelRequest, callback: CollectionHandler) => (
    <React.Fragment>
      {
        isModuleRequestEditable(item.statusType) &&
        <Button 
          size="small"
          onClick={() => callback.handleRedirectTo(`/travel/requests/form`, { uid: item.uid })}
        >
          <FormattedMessage {...layoutMessage.action.modify}/>
        </Button>
      }
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/travel/requests/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  )
};

type AllProps 
  = WithUser
  & WithTravelRequest
  & InjectedIntlProps;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const TravelRequestList = compose(
  withUser,
  withTravelRequest,
  injectIntl
)(listView);