import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITravelSettlementRequestDetail } from '@travel/classes/response';
import { TravelInformation } from '@travel/components/request/detail/shared/TravelInformation';
import { TravelRequestItem } from '@travel/components/request/detail/shared/TravelRequestItem';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { TravelSettlementInformation } from './shared/TravelSettlementInformation';
import { TravelSettlementItem } from './shared/TravelSettlementItem';
import { TravelSettlementSummary } from './shared/TravelSettlementSummary';
import { TravelSettlementDetailProps } from './TravelSettlementDetails';

export const TravelSettlementDetailViews: React.SFC<TravelSettlementDetailProps> = props => {   
  const render = (
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
      primary={(data: ITravelSettlementRequestDetail) => (
        <TravelSettlementSummary
          data={data.settlement}
          travelData={data.request}
        />
      )}
      secondary={(data: ITravelSettlementRequestDetail) => ([
        <TravelSettlementItem data={data.settlement && data.settlement.items} />,
        <TravelRequestItem data={data.request && data.request.items} />,
        <TravelSettlementInformation data={data.settlement} />,
        <React.Fragment>
          {
            data.request &&
            <TravelInformation data={data.request} />
          }
        </React.Fragment>,
        <WorkflowHistory data={data.settlement.workflow} />,

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

  return render;
};