import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';

import { ITravelRequestDetail } from '@travel/classes/response';
import { TravelUserAction } from '@travel/classes/types';
import { TravelInformation } from '@travel/components/request/detail/shared/TravelInformation';
import { TravelRequestItem } from '@travel/components/request/detail/shared/TravelRequestItem';
import { TravelRequestSummary } from '@travel/components/request/detail/shared/TravelRequestSummary';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { TravelRequestApprovalDetailProps } from './TravelRequestApprovalDetail';

const config: SingleConfig<ITravelRequestDetail, TravelRequestApprovalDetailProps> = {
  // page info
  page: (props: TravelRequestApprovalDetailProps) => ({
    uid: AppMenu.TravelApproval,
    parentUid: AppMenu.Travel,
    title: props.intl.formatMessage(travelMessage.requestApproval.page.detailTitle),
    description: props.intl.formatMessage(travelMessage.requestApproval.page.detailTitle)
  }),

  // parent url
  parentUrl: (props: TravelRequestApprovalDetailProps) => '/travel/approvals',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: TravelRequestApprovalDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: TravelUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    }
  ]),

  // events
  onDataLoad: (props: TravelRequestApprovalDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.travelApprovalState.detail;
    const { loadDetailRequest } = props.travelApprovalDispatch;

    // when user is set and not loading and has travelUid in route params
    if (user && !isLoading && props.match.params.travelUid) {
      // when travelUid was changed or response are empty or force to reload
      if ((request && request.travelUid !== props.match.params.travelUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          travelUid: props.match.params.travelUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onDataLoaded: (props: TravelRequestApprovalDetailProps) => {
    // set data loaded in local state
    props.setDataload();
  },
  onUpdated: (props: TravelRequestApprovalDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.travelApprovalState.detail;
    
    // set loading status
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: ITravelRequestDetail, props: TravelRequestApprovalDetailProps) => (
    <TravelRequestSummary data={data}/>
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ITravelRequestDetail, props: TravelRequestApprovalDetailProps) => ([
    <TravelInformation data={data} />,
    <TravelRequestItem data={data.items} />,
    <WorkflowHistory data={data.workflow} />,
    <React.Fragment>
      {
        data.workflow && 
        data.workflow.isApproval &&
        <WorkflowApprovalForm
          approvalTitle={props.approvalTitle}
          approvalSubHeader={props.approvalSubHeader}
          approvalChoices={props.approvalChoices}
          approvalTrueValue={props.approvalTrueValue}
          approvalDialogTitle={props.approvalDialogTitle}
          approvalDialogContentText={props.approvalDialogContentText}
          approvalDialogCancelText={props.approvalDialogCancelText}
          approvalDialogConfirmedText={props.approvalDialogConfirmedText}
          validate={props.handleValidate}
          onSubmit={props.handleSubmit} 
          onSubmitSuccess={props.handleSubmitSuccess}
          onSubmitFail={props.handleSubmitFail}
        />
      }
    </React.Fragment>
  ])
};

export const TravelRequestApprovalDetailView: React.SFC<TravelRequestApprovalDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
    shouldDataReload={props.shouldDataReload}
  />
);