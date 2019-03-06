import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import { IProject } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectAdministrationSummary } from '../shared/ProjectAdministrationSummary';
import { ProjectAdministrationListFilter } from './ProjectAdministrationFilter';
import { ProjectAdministrationListProps } from './ProjectAdministrationList';

export const ProjectAdministrationListView: React.SFC<ProjectAdministrationListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.ProjectRegistrationRequest,
        parentUid: AppMenu.ProjectRegistration,
        title: props.intl.formatMessage(projectMessage.registration.page.listTitle),
        description: props.intl.formatMessage(projectMessage.registration.page.listSubHeader)
      }}

      // state & fields
      state={props.projectAdministrationState.all}
      fields={props.fields}
      
      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IProject) => ( 
        <ProjectAdministrationSummary data={item} />
      )}
      actionComponent={(item: IProject) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/project/administrations/${item.uid}`, {isAdministration : true})}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        
        <SearchBox
          key="project.administration.request"
          default={props.projectAdministrationState.all.request && props.projectAdministrationState.all.request.filter && props.projectAdministrationState.all.request.filter.find}
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
              disabled={props.projectAdministrationState.all.isLoading || props.projectAdministrationState.all.isError}
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

    <ProjectAdministrationListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        projectType: props.projectType,
        statusType: props.statusType,
        status: props.status,
        isRejected: props.isRejected,
        isNewOwner: props.isNewOwner
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);