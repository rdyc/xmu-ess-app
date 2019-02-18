import { ProjectType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { IProjectDetail } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectRegistrationDetailProps } from './ProjectRegistrationDetail';
import { ProjectDocument } from './shared/ProjectDocument';
import { ProjectInformation } from './shared/ProjectInformation';
import { ProjectSales } from './shared/ProjectSales';
import { ProjectSite } from './shared/ProjectSite';

export const ProjectRegistrationDetailView: React.SFC<ProjectRegistrationDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      parentUrl: '/project/requests',
      title: props.intl.formatMessage(projectMessage.registration.page.detailTitle),
      description: props.intl.formatMessage(projectMessage.registration.page.detailSubHeader)
    }}
    options={props.pageOptions}
    state={props.projectRegisterState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IProjectDetail) => (
      <ProjectInformation data={data} />
    )}
    secondary={(data: IProjectDetail) => ([
      <ProjectDocument 
        title={props.intl.formatMessage(data.projectType === ProjectType.Project ? projectMessage.registration.section.documentProjectTitle : projectMessage.registration.section.documentPreSalesTitle)}
        data={data.projectType === ProjectType.Project ? data.documents : data.documentPreSales}
      />,
      <ProjectSales data={data.sales} />,
      <ProjectSite data={data.sites} />,
      <WorkflowHistory data={data.workflow} />
    ])}
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