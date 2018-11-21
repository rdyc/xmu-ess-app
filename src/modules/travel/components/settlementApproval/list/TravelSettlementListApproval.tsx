import AppMenu from '@constants/AppMenu';
import { ICollectionValue } from '@layout/classes/core';
import {
  CollectionConfig,
  CollectionDataProps,
  CollectionHandler,
  CollectionPage,
  CollectionPageProps,
} from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import { projectRegistrationFieldTranslator } from '@project/helper';
import { ITravelSettlement } from '@travel/classes/response';
import { TravelRequestField, TravelUserAction } from '@travel/classes/types';
import { TravelSummarySettlement } from '@travel/components/settlement/detail/shared/TravelSummarySettlement';
import { WithTravelSettlementApproval, withTravelSettlementApproval } from '@travel/hoc/withTravelSettlementApproval';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { compose } from 'recompose';

const travelSettlementApprovalFields: ICollectionValue[] = Object.keys(TravelRequestField).map(key => ({ 
  value: key, 
  name: TravelRequestField[key] 
}));

const menuOptions = (props: CollectionPageProps): IAppBarMenu[] => ([
  {
    id: TravelUserAction.Refresh,
    name: props.intl.formatMessage(layoutMessage.action.refresh),
    enabled: true,
    visible: true,
    onClick: () => props.setForceReload(true)
  },
  {
    id: TravelUserAction.Create,
    name: props.intl.formatMessage(layoutMessage.action.create),
    enabled: true,
    visible: true,
    onClick: () => console.log('asdas')
  }
]);

const config: CollectionConfig<ITravelSettlement, AllProps> = {
  // page info
  uid: AppMenu.TravelSettlementApproval,
  parentUid: AppMenu.Travel,
  title: 'Travel Settlement Approval',
  description: 'Description',
  
  // top bar
  fields: travelSettlementApprovalFields,
  fieldTranslator: projectRegistrationFieldTranslator,

  // selection
  hasSelection: false,

  // searching
  hasSearching: true,
  searchStatus: (states: AllProps): boolean => {
    let result: boolean = false;

    const { request } = states.travelSettlementApprovalState.all;

    if (request && request.filter && request.filter.query && request.filter.query.find) {
      result = request.filter.query.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: menuOptions,
  
  // redirection
  hasRedirection: true,
  onRedirect: (item: ITravelSettlement): string => {
    return `/travel/settlement/approval/${item.uid}`;
  },

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
            query: {
              direction: params.direction,
              orderBy: params.orderBy,
              page: params.page,
              size: params.size,
              find: params.find,
              findBy: params.findBy
            },
            status: undefined,
            isNotify: undefined
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
    
    callback.setLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ITravelSettlement, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.customer && item.customer.name || item.customerUid,
    tertiary: item.project && item.project.name || item.projectUid,
    quaternary: item.total.toString(),
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ITravelSettlement) => ( 
    <TravelSummarySettlement data={item} />
  ),

  // action component
  actionComponent: (item: ITravelSettlement) => (
    <Button 
      size="small"
      onClick={() => alert(`go to ${item.uid}`)}
    >
      <FormattedMessage {...layoutMessage.action.details}/>
    </Button>
  ),

  // custom row render: uncomment to see different
  // onRowRender: (item: IProject, index: number) => (
  //   <div key={index}>{item.name}</div>
  // )
};

type AllProps 
  = WithUser
  & WithTravelSettlementApproval
  & InjectedIntlProps;

const travelSettlementListApproval: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const TravelSettlementListApproval = compose(
  withUser,
  withTravelSettlementApproval
)(travelSettlementListApproval);