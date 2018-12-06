import AppMenu from '@constants/AppMenu';
import {
  SingleConfig,
  SingleHandler,
  SinglePage,
  SingleState,
} from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IMileageRequestDetail } from '@mileage/classes/response';
import { MileageUserAction } from '@mileage/classes/types';
import { MileageInformation } from '@mileage/components/request/detail/shared/MileageInformation';
import { MileageItem } from '@mileage/components/request/detail/shared/MileageItem';

import { WorkflowStatusType } from '@common/classes/types';
import { MileageApprovalItem } from '@mileage/components/approval/detail/MileageApprovalItem';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { MileageApprovalDetailProps } from './MileageApprovalDetail';
import { WorkflowMileageApproval } from './WorkflowMileageApproval';

const config: SingleConfig<IMileageRequestDetail, MileageApprovalDetailProps> = {
  // page info
  page: (props: MileageApprovalDetailProps) => ({
    uid: AppMenu.MileageApproval,
    parentUid: AppMenu.Mileage,
    title: props.intl.formatMessage(mileageMessage.request.page.detailTitle),
    description: props.intl.formatMessage(mileageMessage.request.page.detailSubHeader)
  }),

  // parent url
  parentUrl: (props: MileageApprovalDetailProps) => {
    let path = '';
    if (props.location.state && props.location.state.financeUid) {
      path = `/finance/approvals/${props.location.state.financeUid}`;
    } else {
      path = '/mileage/approvals';
    }
    return path;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: MileageApprovalDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => [
    {
      id: MileageUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ],

  // events
  onDataLoad: (
    props: MileageApprovalDetailProps,
    callback: SingleHandler,
    forceReload?: boolean | false
  ) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.mileageApprovalState.detail;
    const { loadDetailRequest } = props.mileageApprovalDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.mileageUid) {
      // when projectUid was changed or response are empty or force to reload
      if (
        (request && request.mileageUid !== props.match.params.mileageUid) ||
        !response ||
        forceReload
      ) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          mileageUid: props.match.params.mileageUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onDataLoaded: (props: MileageApprovalDetailProps) => {
    // set data loaded in local state
    props.setDataload();
  },
  onUpdated: (states: MileageApprovalDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.mileageApprovalState.detail;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },

  // primary
  primaryComponent: (data: IMileageRequestDetail) => (
    <MileageInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IMileageRequestDetail, props: MileageApprovalDetailProps) => [
    data.workflow && data.workflow.isApproval ? (
        <MileageApprovalItem 
          data={data.items}
          ItemUids={props.mileageItemUids}
          handleCheckbox={props.handleCheckbox}
        />     
      ) : (
        <MileageItem items={data.items} />      
      ),
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
  ]
};

export const MileageApprovalDetailView: React.SFC<MileageApprovalDetailProps> = props => (
  <SinglePage config={config} connectedProps={props} shouldDataReload={props.shouldDataReload}/>
);