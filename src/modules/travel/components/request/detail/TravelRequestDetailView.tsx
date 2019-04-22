import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { ITravelRequestDetail } from '@travel/classes/response';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';

import { TravelInformation } from './shared/TravelInformation';
import { TravelRequestItem } from './shared/TravelRequestItem';
import { TravelRequestSummary } from './shared/TravelRequestSummary';
import { TravelRequestDetailProps } from './TravelRequestDetail';

export const TravelRequestDetailView: React.SFC<TravelRequestDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.TravelRequest,
      parentUid: AppMenu.Travel,
      parentUrl: '/travel/requests',
      title: props.intl.formatMessage(travelMessage.request.page.detailTitle),
      description: props.intl.formatMessage(travelMessage.request.page.detailSubHeader)
    }}
    state={props.travelRequestState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ITravelRequestDetail) => ([
      <TravelRequestSummary data={data} />,
      <TravelInformation data={data} />
    ])}
    secondary={(data: ITravelRequestDetail) => ([
      <TravelRequestItem data={data.items} />
    ])}
    tertiary={(data: ITravelRequestDetail) => ([
      <WorkflowHistory data={data.workflow} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="travel-request-option"
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