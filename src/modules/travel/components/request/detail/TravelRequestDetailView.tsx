import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITravelRequestDetail } from '@travel/classes/response';
import { TravelUserAction } from '@travel/classes/types';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { isNull } from 'util';
import { TravelInformation } from './shared/TravelInformation';
import { TravelRequestItem } from './shared/TravelRequestItem';
import { TravelRequestSummary } from './shared/TravelRequestSummary';
import { TravelRequestDetailProps } from './TravelRequestDetail';

const isContains = (statusType: WorkflowStatusType | undefined, statusTypes: string[]): boolean => { 
  return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
};

const config: SingleConfig<ITravelRequestDetail, TravelRequestDetailProps> = {
  // page info
  page: (props: TravelRequestDetailProps) => ({
    uid: AppMenu.TravelRequest,
    parentUid: AppMenu.Travel,
    title: props.intl.formatMessage(travelMessage.request.page.detailTitle),
    description: props.intl.formatMessage(travelMessage.request.page.detailSubHeader)
  }),

  // parent url
  parentUrl: (props: TravelRequestDetailProps) => '/travel/requests',

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: TravelRequestDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
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
      visible: isContains(state.statusType, [ WorkflowStatusType.Submitted, WorkflowStatusType.InProgress]),
      onClick: props.handleOnModify
    },
    {
      id: TravelUserAction.AddSettlement,
      name: props.intl.formatMessage(travelMessage.request.option.addSettlement),
      enabled: true,
      visible: isContains(state.statusType, [ WorkflowStatusType.Approved]) && isNull(props.travelRequestState.detail.response && props.travelRequestState.detail.response.data.settlement)  ,
      onClick: props.handleAddSettlement
    }
  ]),

  // events
  onDataLoad: (props: TravelRequestDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
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
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onUpdated: (states: TravelRequestDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.travelRequestState.detail;

    callback.handleLoading(isLoading);

    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: ITravelRequestDetail, props: TravelRequestDetailProps) => (
    <TravelRequestSummary data={data}/>
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ITravelRequestDetail, props: TravelRequestDetailProps) => ([
    <TravelInformation data={data} />,
    <TravelRequestItem data={data.items} />,
    <WorkflowHistory data={data.workflow} />,
    
  ])
};

export const TravelRequestDetailView: React.SFC<TravelRequestDetailProps> = props => (
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