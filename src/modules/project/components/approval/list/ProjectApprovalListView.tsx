import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationSumarry } from '@project/components/registration/detail/shared/ProjectRegistrationSummary';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectApprovalListProps } from './ProjectApprovalList';
import { ProjectApprovalListFilter } from './ProjectApprovalListFilter';

export const ProjectApprovalListView: React.SFC<ProjectApprovalListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.ProjectRegistrationApproval,
        parentUid: AppMenu.ProjectRegistration,
        title: props.intl.formatMessage(projectMessage.approval.page.listTitle),
        description: props.intl.formatMessage(projectMessage.approval.page.listSubHeader),
      }}

      // state & fields
      state={props.projectApprovalState.all}
      fields={props.fields}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IProject) => ( 
        <ProjectRegistrationSumarry data={item} />
      )}
      actionComponent={(item: IProject) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => props.history.push(`/project/approvals/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="project.registration.approval"
          default={props.projectApprovalState.all.request && props.projectApprovalState.all.request.filter && props.projectApprovalState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
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
              disabled={props.projectApprovalState.all.isLoading || props.projectApprovalState.all.isError}
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

    <ProjectApprovalListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        projectType: props.projectType,
        statusType: props.statusType,
        status: props.status,
        isNotify: props.isNotify,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);