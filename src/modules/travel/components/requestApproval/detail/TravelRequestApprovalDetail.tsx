import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage } from '@layout/components/pages/singlePage/SinglePage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITravelRequestDetail } from '@travel/classes/response';
import { TravelUserAction } from '@travel/classes/types';
import { TravelInformation } from '@travel/components/request/detail/shared/TravelInformation';
import { TravelRequestItem } from '@travel/components/request/detail/shared/TravelRequestItem';
import { TravelRequestSummary } from '@travel/components/request/detail/shared/TravelRequestSummary';
import { WithTravelApproval } from '@travel/hoc/withTravelApproval';
import { withTravelRequest } from '@travel/hoc/withTravelRequest';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';

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
  ]),

  // events
  onDataLoad: (props: AllProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.travelApprovalState.detail;
    const { loadDetailRequest } = props.travelApprovalDispatch;

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
    const { isLoading, response } = states.travelApprovalState.detail;

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
    // <WorkflowApprovalForm
    //   approvalTitle={approvalTitle}
    //   approvalSubHeader={approvalSubHeader}
    //   approvalChoices={approvalChoices}
    //   approvalTrueValue={approvalTrueValue}
    //   approvalDialogTitle={approvalDialogTitle}
    //   approvalDialogContentText={approvalDialogContentText}
    //   approvalDialogCancelText={approvalDialogCancelText}
    //   approvalDialogConfirmedText={approvalDialogConfirmedText}
    //   validate={handleValidate}
    //   onSubmit={handleSubmit} 
    //   onSubmitSuccess={handleSubmitSuccess}
    //   onSubmitFail={handleSubmitFail}
    // />    
  ])
};

interface OwnRouteParams {
  travelUid: string;
}

type AllProps
  = WithUser
  & WithTravelApproval
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

const travelRequestApprovalDetailView: React.SFC<AllProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  />
);

export const TravelRequestApprovalDetail = compose(
  withRouter,
  withUser,
  withTravelRequest,
  injectIntl,
)(travelRequestApprovalDetailView);