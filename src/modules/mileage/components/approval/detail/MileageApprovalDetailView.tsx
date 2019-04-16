import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { IMileageRequestDetail } from '@mileage/classes/response';
import { MileageApprovalDetailItem } from '@mileage/components/approval/detail/MileageApprovalDetailItem';
import { MileageInformation } from '@mileage/components/request/detail/shared/MileageInformation';
import { MileageItem } from '@mileage/components/request/detail/shared/MileageItem';
import { TimesheetItem } from '@mileage/components/request/detail/shared/TimeSheetItem';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/form/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';

import { MileageApprovalDetailProps } from './MileageApprovalDetail';

const parentUrl = (props: MileageApprovalDetailProps): string => {
  let path = '';

  if (props.location.state && props.location.state.financeUid) {
    path = `/finance/approvals/${props.location.state.financeUid}`;
  } else {
    path = '/mileage/approvals';
  }

  return path;
};

export const MileageApprovalDetailView: React.SFC<MileageApprovalDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.MileageApproval,
      parentUid: AppMenu.Mileage,
      parentUrl: parentUrl(props),
      title: props.intl.formatMessage(mileageMessage.request.page.detailTitle),
      description: props.intl.formatMessage(mileageMessage.request.page.detailSubHeader)
    }}
    state={props.mileageApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IMileageRequestDetail) => ([
      <MileageInformation data={data} />
    ])}
    secondary={(data: IMileageRequestDetail) => ([
      data.workflow && data.workflow.isApproval ? (
          <MileageApprovalDetailItem 
            items={data.items}
            ItemUids={props.mileageItemUids}
            onChecked={props.handleCheckbox}
          />     
        ) : (
          <MileageItem items={data.items} />      
        ),
      <TimesheetItem data={data.timesheets} />
    ])}
    tertiary={(data: IMileageRequestDetail) => ([
      <WorkflowHistory data={data.workflow} />,
      <React.Fragment>
        {
          data.workflow && 
          data.workflow.isApproval &&
          <WorkflowApprovalForm
            title={props.approvalTitle}
            statusTypes={props.approvalStatusTypes}
            trueTypes={props.approvalTrueValues}
            disabled={props.mileageItemUids.length === 0}
            confirmationDialogProps={{
              title: props.approvalDialogTitle,
              message: props.approvalDialogContentText,
              labelCancel: props.approvalDialogCancelText,
              labelConfirm: props.approvalDialogConfirmedText
            }}
            onSubmit={props.handleOnSubmit}
          />
        }
      </React.Fragment>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu
        id="mileage-approval-option"
        selectable={false}
        menuOptions={props.menuOptions}
        onSelected={props.handleOnSelectedMenu}
      />
    }
  />
);