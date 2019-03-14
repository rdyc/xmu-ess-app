import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
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
      uid: props.location.state && props.location.state.isAdministration ? AppMenu.ProjectAdmnistration : AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      parentUrl: props.location.state && props.location.state.isAdministration ? '/project/administrations' : '/project/requests',
      title: props.intl.formatMessage(projectMessage.registration.page.detailTitle),
      description: props.intl.formatMessage(projectMessage.registration.page.detailSubHeader)
    }}
    state={props.projectRegisterState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IProjectDetail) => (
      <ProjectInformation data={data} />
    )}
    secondary={(data: IProjectDetail) => ([
      <ProjectDocument 
        title={props.intl.formatMessage(projectMessage.registration.section.documentProjectTitle)}
        data={data.documents}
      />,
      <ProjectDocument 
        title={props.intl.formatMessage(projectMessage.registration.section.documentPreSalesTitle)}
        data={data.documentPreSales}
      />,
      <ProjectSales data={data.sales} />,
      <ProjectSite data={data.sites} />,
      <WorkflowHistory data={data.workflow} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="project-request-option"
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