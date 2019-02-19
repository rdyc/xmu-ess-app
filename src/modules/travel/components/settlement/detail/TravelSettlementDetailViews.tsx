import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITravelSettlementDetail } from '@travel/classes/response';
import { TravelInformation } from '@travel/components/request/detail/shared/TravelInformation';
import { TravelRequestItem } from '@travel/components/request/detail/shared/TravelRequestItem';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { TravelSettlementInformation } from './shared/TravelSettlementInformation';
import { TravelSettlementItem } from './shared/TravelSettlementItem';
import { TravelSettlementSummary } from './shared/TravelSettlementSummary';
import { TravelSettlementDetailProps } from './TravelSettlementDetails';

export const TravelSettlementDetailViews: React.SFC<TravelSettlementDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.TravelSettlementRequest,
      parentUid: AppMenu.Travel,
      parentUrl: '/travel/settlement/requests',
      title: props.intl.formatMessage(travelMessage.settlement.page.detailTitle),
      description: props.intl.formatMessage(travelMessage.settlement.page.detailSubHeader)

    }}
    options={props.pageOptions}
    state={props.travelSettlementState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ITravelSettlementDetail) => (
      <TravelSettlementSummary
        data={data}
        travelData={props.travelRequestState.detail.response && props.travelRequestState.detail.response.data}
      />
    )}
    secondary={(data: ITravelSettlementDetail) => ([
      <TravelSettlementItem data={data.items} />,
      <TravelRequestItem data={props.travelRequestState.detail.response && props.travelRequestState.detail.response.data.items} />,
      <TravelSettlementInformation data={data} />,
      <TravelInformation data={props.travelRequestState.detail.response && props.travelRequestState.detail.response.data} />,
      <WorkflowHistory data={data.workflow} />,

    ])}
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
  </PreviewPage>
);