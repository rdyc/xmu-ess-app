import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { layoutMessage } from '@layout/locales/messages';
import { IMileageRequestDetail } from '@mileage/classes/response';
import { MileageApprovalItem } from '@mileage/components/approval/detail/MileageApprovalItem';
import { MileageInformation } from '@mileage/components/request/detail/shared/MileageInformation';
import { MileageItem } from '@mileage/components/request/detail/shared/MileageItem';
import { TimesheetItem } from '@mileage/components/request/detail/shared/TimeSheetItem';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';

import { MileageApprovalDetailProps } from './MileageApprovalDetail';
import { WorkflowMileageApproval } from './WorkflowMileageApproval';

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
    primary={(data: IMileageRequestDetail) => (
      <MileageInformation data={data} />
    )}
    secondary={(data: IMileageRequestDetail) => ([
      data.workflow && data.workflow.isApproval ? (
          <MileageApprovalItem 
            items={data.items}
            ItemUids={props.mileageItemUids}
            handleCheckbox={props.handleCheckbox}
          />     
        ) : (
          <MileageItem items={data.items} />      
        ),
      <TimesheetItem data={data.timesheets} />,
      <WorkflowHistory data={data.workflow} />,
      <React.Fragment>
        {data.workflow && data.workflow.isApproval &&
        <WorkflowMileageApproval 
            itemTrue={props.mileageItemUids.length < 1 ? true : false}
            approvalTitle={props.intl.formatMessage(mileageMessage.approval.submission.title)}
            approvalSubHeader={props.intl.formatMessage(mileageMessage.approval.submission.subHeader)}
            approvalChoices={[
              { value: WorkflowStatusType.Approved, 
                label: props.intl.formatMessage(organizationMessage.workflow.option.approve) },
              { value: WorkflowStatusType.Rejected, 
                label: props.intl.formatMessage(organizationMessage.workflow.option.reject) }
            ]}
            approvalTrueValue={WorkflowStatusType.Approved}
            approvalDialogTitle={props.intl.formatMessage(mileageMessage.approval.submission.dialogTitle)}
            approvalDialogContentText={props.intl.formatMessage(mileageMessage.approval.submission.dialogContent)}
            approvalDialogCancelText={props.intl.formatMessage(layoutMessage.action.cancel)}
            approvalDialogConfirmedText={props.intl.formatMessage(layoutMessage.action.continue)}
            validate={props.handleValidate}
            onSubmit={props.handleSubmit}
            onSubmitSuccess={props.handleSubmitSuccess}
            onSubmitFail={props.handleSubmitFail}
          />}
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