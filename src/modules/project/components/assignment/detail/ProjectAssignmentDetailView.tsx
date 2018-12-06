import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IProjectAssignmentDetail } from '@project/classes/response';
import { ProjectUserAction } from '@project/classes/types';
import { ProjectAssignmentDetailProps } from '@project/components/assignment/detail/ProjectAssignmentDetail';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectAssignment } from './shared/ProjectAssignment';
import { ProjectAssignmentItem } from './shared/ProjectAssignmentItem';

const config: SingleConfig<IProjectAssignmentDetail, ProjectAssignmentDetailProps> = {
  // page info
  page: (props: ProjectAssignmentDetailProps) => ({
    uid: AppMenu.ProjectAssignmentRequest,
    parentUid: AppMenu.ProjectAssignment,
    title: props.intl.formatMessage(projectMessage.assignment.page.detailTitle),
    description: props.intl.formatMessage(projectMessage.assignment.page.detailSubHeader)
  }),

  // parent url
  parentUrl: (props: ProjectAssignmentDetailProps) => '/project/assignments',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: ProjectAssignmentDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
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
      enabled: true,
      visible: true,
      onClick: props.handleOnModify
    }
  ]),

  // events
  onDataLoad: (props: ProjectAssignmentDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.projectAssignmentState.detail;
    const { loadDetailRequest } = props.projectAssignmentDispatch;

    // when user is set and not loading and has assignmentUid in route params
    if (user && !isLoading && props.match.params.assignmentUid) {
      // when assignmentUid was changed or response are empty or force to reload
      if ((request && request.assignmentUid !== props.match.params.assignmentUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          assignmentUid: props.match.params.assignmentUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onUpdated: (props: ProjectAssignmentDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.projectAssignmentState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: IProjectAssignmentDetail, props: ProjectAssignmentDetailProps) => (
    <ProjectAssignment 
      formMode={FormMode.View}
      data={data}
      showProjectHours={true}
    />
  ),

  // secondary
  secondaryComponents: (data: IProjectAssignmentDetail, props: ProjectAssignmentDetailProps) => {
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
  }
};

export const ProjectAssignmentDetailView: React.SFC<ProjectAssignmentDetailProps> = props => (
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