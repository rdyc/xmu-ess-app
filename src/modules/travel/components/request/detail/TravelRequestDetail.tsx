import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage } from '@layout/components/pages/singlePage/SinglePage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITravelRequestDetail } from '@travel/classes/response';
import { TravelUserAction } from '@travel/classes/types';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { TravelInformation } from './shared/TravelInformation';
import { TravelRequestItem } from './shared/TravelRequestItem';
import { TravelRequestSummary } from './shared/TravelRequestSummary';

const config: SingleConfig<ITravelRequestDetail, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.TravelRequest,
    parentUid: AppMenu.Travel,
    title: 'Single Page',
    description: 'Demo of single page',
  }),

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AllProps, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: TravelUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: TravelUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: () => alert('go to modify page here')
    },
    {
      id: TravelUserAction.AddSettlement,
      name: props.intl.formatMessage(travelMessage.request.option.addSettlement),
      enabled: true,
      visible: true,
      onClick: () => alert('go to site page here')
    }
  ]),

  // events
  onDataLoad: (props: AllProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.travelRequestState.detail;
    const { loadDetailRequest } = props.travelRequestDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.travelUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.travelUid !== props.match.params.travelUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          travelUid: props.match.params.travelUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AllProps, callback: SingleHandler) => {
    const { isLoading, response } = states.travelRequestState.detail;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },

  // primary
  primaryComponent: (data: ITravelRequestDetail, props: AllProps) => (
    <TravelRequestSummary data={data}/>
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ITravelRequestDetail, props: AllProps) => ([
    <TravelInformation data={data} />,
    <TravelRequestItem data={data.items} />,
    <WorkflowHistory data={data.workflow} />,
    
  ])
};

interface OwnRouteParams {
  travelUid: string;
}

type AllProps
  = WithUser
  & WithTravelRequest
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

const travelRequestDetailView: React.SFC<AllProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  />
);

export const TravelRequestDetail = compose(
  withRouter,
  withUser,
  withTravelRequest,
  injectIntl,
)(travelRequestDetailView);