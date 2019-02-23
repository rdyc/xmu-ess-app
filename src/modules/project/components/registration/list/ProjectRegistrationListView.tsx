import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import { isRequestEditable } from '@organization/helper';
import { IProject } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';

import { ProjectRegistrationSumarry } from '../detail/shared/ProjectRegistrationSummary';
import { ProjectRegistrationListProps } from './ProjectRegistrationList';
import { ProjectRegistrationListFilter } from './ProjectRegistrationListFilter';

export const ProjectRegistrationListView: React.SFC<ProjectRegistrationListProps> = props => (
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
      state={props.projectRegisterState.all}
      fields={props.fields}
      
      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IProject) => ( 
        <ProjectRegistrationSumarry data={item} />
      )}
      actionComponent={(item: IProject) => (
        <React.Fragment>
          {
            isRequestEditable(item.statusType) &&
            <Button 
              size="small"
              onClick={() => props.history.push(`/project/requests/form`, { uid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button 
            size="small"
            onClick={() => props.history.push(`/project/requests/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="project.registration.request"
          default={props.projectRegisterState.all.request && props.projectRegisterState.all.request.filter && props.projectRegisterState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/project/requests/form')}
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
              disabled={props.projectRegisterState.all.isLoading || props.projectRegisterState.all.isError}
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

    <ProjectRegistrationListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        projectType: props.projectType,
        statusType: props.statusType,
        isRejected: props.isRejected,
        isNewOwner: props.isNewOwner
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);