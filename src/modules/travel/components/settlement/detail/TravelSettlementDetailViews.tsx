import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
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
      <React.Fragment>
        {
          props.travelRequestState.detail.response &&
          <TravelInformation data={props.travelRequestState.detail.response.data} />
        }
      </React.Fragment>,
      <WorkflowHistory data={data.workflow} />,

    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="travel-settlement-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
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