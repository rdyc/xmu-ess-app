import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { IMileageRequestDetail } from '@mileage/classes/response';
import { MileageInformation } from '@mileage/components/request/detail/shared/MileageInformation';
import { MileageItem } from '@mileage/components/request/detail/shared/MileageItem';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { MileageRequestDetailProps } from './MileageRequestDetail';
import { TimesheetItem } from './shared/TimeSheetItem';

export const MileageRequestDetailView: React.SFC<MileageRequestDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.MileageRequest,
      parentUid: AppMenu.Mileage,
      parentUrl: '/mileage/requests',
      title: props.intl.formatMessage(mileageMessage.request.page.detailTitle),
      description: props.intl.formatMessage(mileageMessage.request.page.detailSubHeader)
    }}
    state={props.mileageRequestState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IMileageRequestDetail) => ([
      <MileageInformation data={data} />
    ])}
    secondary={(data: IMileageRequestDetail) => ([
      <MileageItem items={data.items}/>,
      <TimesheetItem data={data.timesheets} />
    ])}
    tertiary={(data: IMileageRequestDetail) => ([
      <WorkflowHistory data={data.workflow} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu
        id="mileage-request-option"
        selectable={false}
        menuOptions={props.menuOptions}
        onSelected={props.handleOnSelectedMenu}
      />
    }
  />
);