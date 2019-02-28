import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { TextField } from '@material-ui/core';
import { IProjectAssignmentDetail } from '@project/classes/response';
import { ProjectAssignment } from '@project/components/assignment/detail/shared/ProjectAssignment';
import { ProjectAssignmentItem } from '@project/components/assignment/detail/shared/ProjectAssignmentItem';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectAcceptanceDetailProps } from './ProjectAcceptanceDetail';

/*
const config: SingleConfig<IProjectAssignmentDetail, ProjectAcceptanceDetailProps> = {
  // page info
  page: (props: ProjectAcceptanceDetailProps) => ({
    uid: AppMenu.ProjectAssignmentAcceptance,
    parentUid: AppMenu.ProjectAssignment,
    title: props.intl.formatMessage(projectMessage.assignment.page.detailTitle),
    description: props.intl.formatMessage(projectMessage.assignment.page.detailSubHeader)
  }),

  // parent url
  parentUrl: (props: ProjectAcceptanceDetailProps) => '/project/acceptances',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: ProjectAcceptanceDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: ProjectUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    }
  ]),

  // events
  onDataLoad: (props: ProjectAcceptanceDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
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
  onUpdated: (props: ProjectAcceptanceDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.projectAssignmentState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: IProjectAssignmentDetail, props: ProjectAcceptanceDetailProps) => (
    <ProjectAssignment 
      formMode={FormMode.View} 
      data={data}
    >
      {
        props.newMandays !== 0 &&
        <React.Fragment>
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(projectMessage.assignment.field.newMandays)}
            value={props.intl.formatNumber(props.newMandays)}
          />
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(projectMessage.assignment.field.newHours)}
            value={props.intl.formatNumber(props.newMandays * 8)}
          />
        </React.Fragment>
      }
    </ProjectAssignment>
  ),

  // secondary
  secondaryComponents: (data: IProjectAssignmentDetail, props: ProjectAcceptanceDetailProps) => {
    const components: JSX.Element[] = [];

    if (data.items) {
      data.items
        .filter(item => item.employeeUid === (props.userState.user ? props.userState.user.uid : undefined))
        .forEach((item, index) => {
          const element: JSX.Element = (
            <ProjectAssignmentItem 
              data={item} 
              title={`Assignment #${index + 1}`} 
              subHeader={item.status && item.status.value || 'N/A'}
              onClickItem={() => props.handleOnClickItem(item.uid)}
            />
          );
            
          components.push(element);
      });
    }
        
    return components;
  }
};
*/

export const ProjectAcceptanceDetailView: React.SFC<ProjectAcceptanceDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.ProjectAssignmentAcceptance,
      parentUid: AppMenu.ProjectAssignment,
      parentUrl: '/project/acceptances',
      title: props.intl.formatMessage(projectMessage.assignment.page.detailTitle),
      description: props.intl.formatMessage(projectMessage.assignment.page.detailSubHeader)
    }}
    state={props.projectAssignmentState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IProjectAssignmentDetail) => (
      <ProjectAssignment 
        formMode={FormMode.View} 
        data={data}
      >
        {
          props.newMandays !== 0 &&
          <React.Fragment>
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(projectMessage.assignment.field.newMandays)}
              value={props.intl.formatNumber(props.newMandays)}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(projectMessage.assignment.field.newHours)}
              value={props.intl.formatNumber(props.newMandays * 8)}
            />
          </React.Fragment>
        }
      </ProjectAssignment>
    )}
    secondary={(data: IProjectAssignmentDetail) => {
      const components: JSX.Element[] = [];

      if (data.items) {
        data.items
          .filter(item => item.employeeUid === (props.userState.user ? props.userState.user.uid : undefined))
          .forEach((item, index) => {
            const element: JSX.Element = (
              <ProjectAssignmentItem 
                data={item} 
                title={`Assignment #${index + 1}`} 
                subHeader={item.status && item.status.value || 'N/A'}
                onClickItem={() => props.handleOnClickItem(item.uid)}
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
        id="project-acceptance-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  />
);