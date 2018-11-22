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
import { ITravelSettlement } from '@travel/classes/response';
import { TravelRequestField, TravelUserAction } from '@travel/classes/types';
import { TravelSummarySettlement } from '@travel/components/settlement/detail/shared/TravelSummarySettlement';
import { travelFieldTranslator } from '@travel/helper/travelFieldTranslator';
import { WithTravelSettlementApproval, withTravelSettlementApproval } from '@travel/hoc/withTravelSettlementApproval';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'redux';

const config: CollectionConfig<ITravelSettlement, AllProps> = {
  // page
  page: (props: AllProps) => ({
    uid: AppMenu.TravelSettlementApproval,
    parentUid: AppMenu.Travel,
    title: props.intl.formatMessage(travelMessage.settlementApproval.page.listTitle),
    description: props.intl.formatMessage(travelMessage.settlementApproval.page.listSubHeader),
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

    const { request } = states.travelSettlementApprovalState.all;

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

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },

  // events
  onDataLoad: (states: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.travelSettlementApprovalState.all;
    const { loadAllRequest } = states.travelSettlementApprovalDispatch;

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
              direction: params.direction,
              orderBy: params.orderBy,
              page: params.page,
              size: params.size,
              find: params.find,
              findBy: params.findBy
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
    const { isLoading, response } = states.travelSettlementApprovalState.all;
    
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
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/travel/approvals/settlement/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  )
};

type AllProps 
  = WithUser
  & WithTravelSettlementApproval
  & InjectedIntlProps;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const TravelSettlementListApproval = compose(
  withUser,
  withTravelSettlementApproval,
  injectIntl
)(listView);