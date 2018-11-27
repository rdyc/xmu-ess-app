import { ProjectType, WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { IProjectDetail } from '@project/classes/response';
import { ProjectUserAction } from '@project/classes/types';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectRegistrationDetailProps } from './ProjectRegistrationDetail';
import { ProjectDocument } from './shared/ProjectDocument';
import { ProjectInformation } from './shared/ProjectInformation';
import { ProjectSales } from './shared/ProjectSales';
import { ProjectSite } from './shared/ProjectSite';

const isContains = (statusType: WorkflowStatusType | undefined, statusTypes: string[]): boolean => { 
  return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
};

const config: SingleConfig<IProjectDetail, ProjectRegistrationDetailProps> = {
  // page info
  page: (props: ProjectRegistrationDetailProps) => ({
    uid: AppMenu.ProjectRegistrationRequest,
    parentUid: AppMenu.ProjectRegistration,
    title: props.intl.formatMessage(projectMessage.registration.page.detailTitle),
    description: props.intl.formatMessage(projectMessage.registration.page.detailSubHeader)
  }),

  // parent url
  parentUrl: (props: ProjectRegistrationDetailProps) => '/project/requests',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: ProjectRegistrationDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: ProjectUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    },
    {
      id: ProjectUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: state.statusType !== undefined,
      visible: isContains(state.statusType, [ WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.Approved ]),
      onClick: props.handleOnModify
    },
    {
      id: ProjectUserAction.Close,
      name: props.intl.formatMessage(projectMessage.registration.option.close),
      enabled: true,
      visible: isContains(state.statusType, [ WorkflowStatusType.Approved, WorkflowStatusType.ReOpened ]),
      onClick: props.handleOnChangeStatus
    },
    {
      id: ProjectUserAction.ReOpen,
      name: props.intl.formatMessage(projectMessage.registration.option.reOpen),
      enabled: true,
      visible: isContains(state.statusType, [ WorkflowStatusType.Closed ]),
      onClick: props.handleOnReOpen
    },
    {
      id: ProjectUserAction.ChangeOwner,
      name: props.intl.formatMessage(projectMessage.registration.option.owner),
      enabled: true,
      visible: isContains(state.statusType, [ WorkflowStatusType.Approved ]),
      onClick: props.handleOnChangeOwner
    },
    {
      id: ProjectUserAction.ManageSites,
      name: props.intl.formatMessage(projectMessage.registration.option.site),
      enabled: true,
      visible: isContains(state.statusType, [WorkflowStatusType.Approved]) && state.isAdmin,
      onClick: props.handleOnManageSite
    }
  ]),

  // events
  onDataLoad: (props: ProjectRegistrationDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.projectRegisterState.detail;
    const { loadDetailRequest } = props.projectRegisterDispatch;

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
  onUpdated: (props: ProjectRegistrationDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.projectRegisterState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: IProjectDetail, props: ProjectRegistrationDetailProps) => (
    <ProjectInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IProjectDetail, props: ProjectRegistrationDetailProps) => ([
    <ProjectDocument 
      title={props.intl.formatMessage(data.projectType === ProjectType.Project ? projectMessage.registration.section.documentProjectTitle : projectMessage.registration.section.documentPreSalesTitle)}
      subHeader={props.intl.formatMessage(data.projectType === ProjectType.Project ? projectMessage.registration.section.documentProjectSubHeader : projectMessage.registration.section.documentPreSalesSubHeader)}
      data={data.projectType === ProjectType.Project ? data.documents : data.documentPreSales}
    />,
    <ProjectSales data={data.sales} />,
    <ProjectSite data={data.sites} />,
    <WorkflowHistory data={data.workflow} />
  ])
};

export const ProjectRegistrationDetailView: React.SFC<ProjectRegistrationDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
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
  </SinglePage>
);