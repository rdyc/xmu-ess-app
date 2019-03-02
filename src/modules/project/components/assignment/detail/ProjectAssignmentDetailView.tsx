import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { IProjectAssignmentDetail } from '@project/classes/response';
import { ProjectAssignmentDetailProps } from '@project/components/assignment/detail/ProjectAssignmentDetail';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectAssignment } from './shared/ProjectAssignment';
import { ProjectAssignmentItem } from './shared/ProjectAssignmentItem';

export const ProjectAssignmentDetailView: React.SFC<ProjectAssignmentDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.ProjectAssignmentRequest,
      parentUid: AppMenu.ProjectAssignment,
      parentUrl: '/project/assignments',
      title: props.intl.formatMessage(projectMessage.assignment.page.detailTitle),
      description: props.intl.formatMessage(projectMessage.assignment.page.detailSubHeader)
    }}
    state={props.projectAssignmentState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IProjectAssignmentDetail) => (
      <ProjectAssignment 
        formMode={FormMode.View}
        data={data}
        showProjectHours={true}
      />
    )}
    secondary={(data: IProjectAssignmentDetail) => {
      const components: JSX.Element[] = [];
  
      if (data.items) {
        data.items.forEach((item, index) => {
          const element: JSX.Element = (
            <ProjectAssignmentItem 
              data={item} 
              title={`Assignment #${index + 1}`} 
              subHeader={item.status && item.status.value || 'N/A'} 
            />
          );
          
          components.push(element);
        });
      }
          
      return components;
    }}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="project-assignment-option"
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