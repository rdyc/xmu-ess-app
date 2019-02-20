import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import { IProjectAssignmentDetail } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectAcceptanceSummary } from '../detail/ProjectAcceptanceSummary';
import { ProjectAcceptanceListProps } from './ProjectAcceptanceList';
import { ProjectAcceptanceListFilter } from './ProjectAcceptanceListFilter';

export const ProjectAcceptanceListView: React.SFC<ProjectAcceptanceListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.ProjectAssignmentAcceptance,
        parentUid: AppMenu.ProjectAssignment,
        title: props.intl.formatMessage(projectMessage.acceptance.page.listTitle),
        description : props.intl.formatMessage(projectMessage.acceptance.page.listSubHeader)
      }}

      // state & fields
      state={props.projectAcceptanceState.all}
      fields={props.fields}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IProjectAssignmentDetail) => ( 
        <ProjectAcceptanceSummary data={item} />
      )}
      actionComponent={(item: IProjectAssignmentDetail) => (
        <Button 
          size="small"
          onClick={() => props.history.push(`/project/acceptances/${item.uid}`)}
        >
          {props.intl.formatMessage(layoutMessage.action.details)}
        </Button>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="project.assignment.acceptance"
          default={props.projectAcceptanceState.all.request && props.projectAcceptanceState.all.request.filter && props.projectAcceptanceState.all.request.filter.find}
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
              disabled={props.projectAcceptanceState.all.isLoading || props.projectAcceptanceState.all.isError}
              onClick={props.handleFilterVisibility} 
            >
              <Badge
                invisible={!props.handleFilterBadge()}
                badgeContent={
                  <CheckCircle color="primary" fontSize="small" />
                }
              >
                <Tune/>
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      }
    />

    <ProjectAcceptanceListFilter 
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