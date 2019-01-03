import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITravelSettlementDetail } from '@travel/classes/response';
import { TravelUserAction } from '@travel/classes/types';
import { TravelInformation } from '@travel/components/request/detail/shared/TravelInformation';
import { TravelRequestItem } from '@travel/components/request/detail/shared/TravelRequestItem';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { TravelSettlementInformation } from './shared/TravelSettlementInformation';
import { TravelSettlementItem } from './shared/TravelSettlementItem';
import { TravelSettlementSummary } from './shared/TravelSettlementSummary';
import { TravelSettlementDetailProps } from './TravelSettlementDetails';

const isContains = (statusType: WorkflowStatusType | undefined, statusTypes: string[]): boolean => { 
  return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
};

const config: SingleConfig<ITravelSettlementDetail, TravelSettlementDetailProps> = {
  // page info
  page: (props: TravelSettlementDetailProps) => ({
    uid: AppMenu.TravelSettlementRequest,
    parentUid: AppMenu.Travel,
    title: props.intl.formatMessage(travelMessage.settlement.page.detailTitle),
    description: props.intl.formatMessage(travelMessage.settlement.page.detailSubHeader)
  }),

  // parent url
  parentUrl: (props: TravelSettlementDetailProps) => '/travel/settlement/requests',

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: TravelSettlementDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
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
      visible: isContains(state.statusType, [ WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.AdjustmentNeeded]),
      onClick: props.handleOnModify
    }
  ]),

  // events
  onDataLoad: (props: TravelSettlementDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.travelSettlementState.detail;
    const { loadRequest } = props.travelSettlementDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.travelSettlementUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.travelSettlementUid !== props.match.params.travelSettlementUid) || !response || forceReload) {
        loadRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          travelSettlementUid: props.match.params.travelSettlementUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);        
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onUpdated: (states: TravelSettlementDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.travelSettlementState.detail;
  
    callback.handleLoading(isLoading);

    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
      callback.handleForceReload();
    }
  },

  // primary
  primaryComponent: (data: ITravelSettlementDetail, props: TravelSettlementDetailProps) => (
    <TravelSettlementSummary 
      data={data}
      travelData={props.travelRequestState.detail.response && props.travelRequestState.detail.response.data}
      />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ITravelSettlementDetail, props: TravelSettlementDetailProps) => ([
    <TravelSettlementItem data={data.items} />,
    <TravelRequestItem data={props.travelRequestState.detail.response && props.travelRequestState.detail.response.data.items} />,    
    <TravelSettlementInformation data={data} />,
    <TravelInformation data={props.travelRequestState.detail.response && props.travelRequestState.detail.response.data} />,
    <WorkflowHistory data={data.workflow} />,
    
  ])
};

export const TravelSettlementDetailViews: React.SFC<TravelSettlementDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  >
    <DialogConfirmation 
      isOpen={props.dialogOpen}
      fullScreen={props.dialogFullScreen}
      title={props.dialogTitle}
      content={props.dialogContent}
      labelCancel={props.dialogCancelLabel}
      labelConfirm={props.dialogConfirmLabel}
      onClickCancel={props.handleOnCloseDialog}
      onClickConfirm={props.handleOnConfirm}
    />
  </SinglePage>
);