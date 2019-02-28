import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import { IProjectAssignment } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectAssignmentSummary } from '../detail/shared/ProjectAssignmentSummary';
import { ProjectAssignmentListProps } from './ProjectAssignmentList';
import { ProjectAssignmentListFilter } from './ProjectAssignmentListFilter';

export const ProjectAssignmentListView: React.SFC<ProjectAssignmentListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.ProjectAssignmentRequest,
        parentUid: AppMenu.ProjectAssignment,
        title: props.intl.formatMessage(projectMessage.assignment.page.listTitle),
        description : props.intl.formatMessage(projectMessage.assignment.page.listSubHeader)
      }}

      // state & fields
      state={props.projectAssignmentState.all}
      fields={props.fields}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IProjectAssignment) => ( 
        <ProjectAssignmentSummary data={item} />
      )}
      actionComponent={(item: IProjectAssignment) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => props.history.push('/project/assignments/form', { 
              companyUid: item.customer && item.customer.companyUid, 
              assignmentUid: item.uid 
            })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>

          <Button 
            size="small"
            onClick={() => props.history.push(`/project/assignments/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="project.assignment.request"
          default={props.projectAssignmentState.all.request && props.projectAssignmentState.all.request.filter && props.projectAssignmentState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/project/assignments/form')}
        >
          <AddCircle/>
        </IconButton>
      }

      // data toolbar component
      toolbarDataComponent={
        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.filter)}
        >
          <div>
            <IconButton
              id="option-filter"
              disabled={props.projectAssignmentState.all.isLoading || props.projectAssignmentState.all.isError}
              onClick={props.handleFilterVisibility} 
            >
              <Badge
                invisible={!props.handleFilterBadge()}
                badgeContent={
                  <CheckCircle color="secondary" fontSize="small" />
                }
              >
                <Tune/>
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      }
    />
    
    <ProjectAssignmentListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUids: props.customerUids,
        projectTypes: props.projectTypes,
        statusTypes: props.statusTypes
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);