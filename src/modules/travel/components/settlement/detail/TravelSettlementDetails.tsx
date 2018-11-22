import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage } from '@layout/components/pages/singlePage/SinglePage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITravelSettlementDetail } from '@travel/classes/response';
import { TravelUserAction } from '@travel/classes/types';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { WithTravelSettlement } from '@travel/hoc/withTravelSettlement';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { TravelSettlementInformation } from './shared/TravelSettlementInformation';

const config: SingleConfig<ITravelSettlementDetail, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.TravelSettlementRequest,
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
  ]),

  // events
  onDataLoad: (props: AllProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.travelSettlementState.detail;
    const { loadRequest } = props.travelSettlementDispatch;
    const { loadDetailRequest } = props.travelRequestDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.travelSettlementUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.travelSettlementUid !== props.match.params.travelSettlementUid) || !response || forceReload) {
        loadRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          travelSettlementUid: props.match.params.travelSettlementUid
        });
        if (response) {
          loadDetailRequest ({
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            travelUid: response.data.travelUid
          });
        }
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AllProps, callback: SingleHandler) => {
    const { isLoading, response } = states.travelSettlementState.detail;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },

  // primary
  primaryComponent: (data: ITravelSettlementDetail, props: AllProps) => (
    <TravelSettlementInformation data={data}/>
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ITravelSettlementDetail, props: AllProps) => ([
    <WorkflowHistory data={data.workflow} />,
    
  ])
};

interface OwnRouteParams {
  travelSettlementUid: string;
}

type AllProps
  = WithUser
  & WithTravelSettlement
  & WithTravelRequest
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

const travelSettlementDetailView: React.SFC<AllProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  />
);

export const TravelSettlementDetails = compose(
  withRouter,
  withUser,
  withTravelRequest,
  injectIntl,
)(travelSettlementDetailView);