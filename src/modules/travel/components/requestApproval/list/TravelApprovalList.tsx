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
import { ITravelRequest } from '@travel/classes/response';
import { TravelRequestField, TravelUserAction } from '@travel/classes/types';
import { TravelSummary } from '@travel/components/request/detail/shared/TravelSummary';
import { WithTravelApproval, withTravelApproval } from '@travel/hoc/withTravelApproval';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { compose } from 'recompose';

const travelApprovalFields: ICollectionValue[] = Object.keys(TravelRequestField).map(key => ({ 
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

const config: CollectionConfig<ITravelRequest, AllProps> = {
  // page info
  uid: AppMenu.TravelApproval,
  parentUid: AppMenu.Travel,
  title: 'Travel Approval',
  description: 'Description',
  
  // top bar
  fields: travelApprovalFields,
  fieldTranslator: projectRegistrationFieldTranslator,

  // selection
  hasSelection: false,

  // searching
  hasSearching: true,
  searchStatus: (states: AllProps): boolean => {
    let result: boolean = false;

    const { request } = states.travelApprovalState.all;

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
  onRedirect: (item: ITravelRequest): string => {
    return `/travel/request/approval/${item.uid}`;
  },

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },

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
    const { isLoading, response } = states.travelApprovalState.all;
    
    callback.setLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ITravelRequest, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.customer && item.customer.name || item.customerUid,
    tertiary: item.project && item.project.name || item.projectUid,
    quaternary: item.total.toString(),
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ITravelRequest) => ( 
    <TravelSummary data={item} />
  ),

  // action component
  actionComponent: (item: ITravelRequest) => (
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
  & WithTravelApproval
  & InjectedIntlProps;

const travelApprovalList: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const TravelApprovalList = compose(
  withUser,
  withTravelApproval
)(travelApprovalList);