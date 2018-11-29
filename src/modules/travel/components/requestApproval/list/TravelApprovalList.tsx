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
import { ITravelRequest } from '@travel/classes/response';
import { TravelRequestField, TravelUserAction } from '@travel/classes/types';
import { TravelSummary } from '@travel/components/request/detail/shared/TravelSummary';
import { travelFieldTranslator } from '@travel/helper/travelFieldTranslator';
import { WithTravelApproval, withTravelApproval } from '@travel/hoc/withTravelApproval';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<ITravelRequest, AllProps> = {
  // page
  page: (props: AllProps) => ({
    uid: AppMenu.TravelApproval,
    parentUid: AppMenu.Travel,
    title: props.intl.formatMessage(travelMessage.requestApproval.page.listTitle),
    description: props.intl.formatMessage(travelMessage.requestApproval.page.listSubHeader),
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

    const { request } = states.travelApprovalState.all;

    if (request && request.filter && request.filter.query) {
      result = request.filter.query.find ? true : false;
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

  // events
  onDataLoad: (states: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.travelApprovalState.all;
    const { loadAllRequest } = states.travelApprovalDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            status: 'pending',
            isNotify: undefined,
            query: {
              find: params.find,
              findBy: params.findBy,
              orderBy: params.orderBy,
              direction: params.direction,
              page: params.page,
              size: params.size,
            }            
          }          
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = states.travelApprovalState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ITravelRequest, index: number, props: AllProps) => ({
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
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/travel/approvals/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  )
};

type AllProps 
  = WithUser
  & WithTravelApproval
  & InjectedIntlProps;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const TravelApprovalList = compose(
  withUser,
  withTravelApproval,
  injectIntl
)(listView);