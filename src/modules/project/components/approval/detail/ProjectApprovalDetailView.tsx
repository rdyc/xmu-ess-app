import { ProjectType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { IProjectDetail } from '@project/classes/response';
import { ProjectUserAction } from '@project/classes/types';
import { ProjectDocument } from '@project/components/registration/detail/shared/ProjectDocument';
import { ProjectInformation } from '@project/components/registration/detail/shared/ProjectInformation';
import { ProjectSales } from '@project/components/registration/detail/shared/ProjectSales';
import { ProjectSite } from '@project/components/registration/detail/shared/ProjectSite';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectApprovalDetailProps } from './ProjectApprovalDetail';

const config: SingleConfig<IProjectDetail, ProjectApprovalDetailProps> = {
  // page info
  page: (props: ProjectApprovalDetailProps) => ({
    uid: AppMenu.ProjectRegistrationApproval,
    parentUid: AppMenu.ProjectRegistration,
    title: props.intl.formatMessage(projectMessage.approval.page.detailTitle),
    description: props.intl.formatMessage(projectMessage.approval.page.detailTitle)
  }),
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: ProjectApprovalDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: ProjectUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    }
  ]),

  // events
  onDataLoad: (props: ProjectApprovalDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.projectApprovalState.detail;
    const { loadDetailRequest } = props.projectApprovalDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.projectUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.projectUid !== props.match.params.projectUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          projectUid: props.match.params.projectUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onUpdated: (states: ProjectApprovalDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.projectApprovalState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: IProjectDetail, props: ProjectApprovalDetailProps) => (
    <ProjectInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IProjectDetail, props: ProjectApprovalDetailProps) => ([
    <ProjectDocument 
      title={props.intl.formatMessage(data.projectType === ProjectType.Project ? projectMessage.registration.section.documentProjectTitle : projectMessage.registration.section.documentPreSalesTitle)}
      subHeader={props.intl.formatMessage(data.projectType === ProjectType.Project ? projectMessage.registration.section.documentProjectSubHeader : projectMessage.registration.section.documentPreSalesSubHeader)}
      data={data.projectType === ProjectType.Project ? data.documents : data.documentPreSales}
    />,
    <ProjectSales data={data.sales} />,
    <ProjectSite data={data.sites} />,
    <WorkflowHistory data={data.workflow} />,
    <React.Fragment>
      {
        data.workflow && 
        data.workflow.isApproval &&
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

export const ProjectApprovalDetailView: React.SFC<ProjectApprovalDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  />
);