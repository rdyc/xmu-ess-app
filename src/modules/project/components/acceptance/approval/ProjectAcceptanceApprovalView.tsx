import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { IProjectAssignmentDetailItem } from '@project/classes/response';
import { ProjectUserAction } from '@project/classes/types';
import { ProjectAssignmentItem } from '@project/components/assignment/detail/shared/ProjectAssignmentItem';
import { ProjectInformationSimple } from '@project/components/registration/detail/shared/ProjectInformationSimple';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectAcceptanceApprovalProps } from './ProjectAcceptanceApproval';

const config: SingleConfig<IProjectAssignmentDetailItem, ProjectAcceptanceApprovalProps> = {
  // page info
  page: (props: ProjectAcceptanceApprovalProps) => ({
    uid: AppMenu.ProjectAssignmentAcceptance,
    parentUid: AppMenu.ProjectAssignment,
    title: props.intl.formatMessage(projectMessage.acceptance.page.approvalTitle),
    description: props.intl.formatMessage(projectMessage.acceptance.page.approvalSubHeader)
  }),

  // parent url
  parentUrl: (props: ProjectAcceptanceApprovalProps) => `/project/acceptances/${props.match.params.assignmentUid}`,
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: ProjectAcceptanceApprovalProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: ProjectUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    }
  ]),

  // events
  onDataLoad: (props: ProjectAcceptanceApprovalProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.projectAcceptanceState.detail;
    const { loadDetailRequest } = props.projectAcceptanceDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.assignmentUid && props.match.params.assignmentItemUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.assignmentUid !== props.match.params.assignmentUid && request.assignmentItemUid !== props.match.params.assignmentItemUid) || !response || forceReload) {
        loadDetailRequest({
          assignmentUid: props.match.params.assignmentUid,
          assignmentItemUid: props.match.params.assignmentItemUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onDataLoaded: (props: ProjectAcceptanceApprovalProps) => {
    // set data loaded in local state
    props.setDataload();
  },
  onUpdated: (props: ProjectAcceptanceApprovalProps, callback: SingleHandler) => {
    const { isLoading, response } = props.projectAcceptanceState.detail;
    
    // set loading status
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: IProjectAssignmentDetailItem, props: ProjectAcceptanceApprovalProps) => (
    <ProjectInformationSimple data={data.project} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IProjectAssignmentDetailItem, props: ProjectAcceptanceApprovalProps) => ([
    <ProjectAssignmentItem 
      data={data} 
      title={props.intl.formatMessage(projectMessage.assignment.section.itemTitle)} 
      subHeader={props.intl.formatMessage(projectMessage.assignment.section.itemSubHeader)} 
    />,
    <React.Fragment>
      {
        data.statusType === WorkflowStatusType.Submitted &&
        <WorkflowApprovalForm
          approvalTitle={props.approvalTitle}
          approvalSubHeader={props.approvalSubHeader}
          approvalChoices={props.approvalChoices}
          approvalTrueValue={props.approvalTrueValue}
          approvalDialogTitle={props.approvalDialogTitle}
          approvalDialogContentText={props.approvalDialogContentText}
          approvalDialogCancelText={props.approvalDialogCancelText}
          approvalDialogConfirmedText={props.approvalDialogConfirmedText}
          validate={props.handleValidate}
          onSubmit={props.handleSubmit} 
          onSubmitSuccess={props.handleSubmitSuccess}
          onSubmitFail={props.handleSubmitFail}
        />
      }
    </React.Fragment>
  ])
};

export const ProjectAcceptanceApprovalView: React.SFC<ProjectAcceptanceApprovalProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
    shouldDataReload={props.shouldDataReload}
  />
);