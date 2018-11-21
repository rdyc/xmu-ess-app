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
import { Button } from '@material-ui/core';
import { isRequestEditable } from '@organization/helper/isRequestEditable';
import { ITravelSettlement } from '@travel/classes/response';
import { TravelRequestField, TravelUserAction } from '@travel/classes/types';
import { TravelSummarySettlement } from '@travel/components/settlement/detail/shared/TravelSummarySettlement';
import { travelFieldTranslator } from '@travel/helper/travelFieldTranslator';
import { WithTravelSettlement, withTravelSettlement } from '@travel/hoc/withTravelSettlement';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<ITravelSettlement, AllProps> = {
  page: (props: AllProps) => ({
    uid: AppMenu.TravelSettlementRequest,
    parentUid: AppMenu.Travel,
    title: props.intl.formatMessage(travelMessage.settlement.page.listTitle),
    description: props.intl.formatMessage(travelMessage.settlement.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(TravelRequestField)
    .map(key => ({ 
      value: key, 
      name: TravelRequestField[key] 
    })),
  fieldTranslator: travelFieldTranslator,

  // selection
  hasSelection: false,

  // searching
  hasSearching: true,
  searchStatus: (states: AllProps): boolean => {
    let result: boolean = false;

    const { request } = states.travelSettlementState.all;

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
    }
  ]),
  
  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },

  // events
  onDataLoad: (states: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.travelSettlementState.all;
    const { loadAllRequest } = states.travelSettlementDispatch;

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
    const { isLoading, response } = states.travelSettlementState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ITravelSettlement, index: number) => ({
    key: index,
    primary: item.objective ? item.objective : 'N/A',
    secondary: item.customer && item.customer.name || item.customerUid,
    tertiary: item.uid,
    quaternary: item.project && item.project.name || item.projectUid,
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ITravelSettlement) => ( 
    <TravelSummarySettlement data={item} />
  ),

  // action component
  actionComponent: (item: ITravelSettlement, callback: CollectionHandler) => (
    <React.Fragment>
      {
        isRequestEditable(item.statusType) &&
        <Button 
          size="small"
          onClick={() => callback.handleRedirectTo(`/travel/settlements/form`, { uid: item.uid })}
        >
          <FormattedMessage {...layoutMessage.action.modify}/>
        </Button>
      }

      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/travel/settlements/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  )
};

type AllProps 
  = WithUser
  & WithTravelSettlement
  & InjectedIntlProps;

const listview: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const TravelSettlementRequestList = compose(
  withUser,
  withTravelSettlement,
  injectIntl
)(listview);