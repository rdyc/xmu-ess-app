import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { IconButton } from '@material-ui/core';
import { BorderColor } from '@material-ui/icons';
import { IWorkflow } from '@organization/classes/response/workflow';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { OrganizationWorkflowDetailProps } from './OrganizationWorkflowDetail';
import { OrganizationWorkflowSummary } from './shared/OrganizationWorkflowSummary';

export const OrganizationWorkflowDetailView: React.SFC<OrganizationWorkflowDetailProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.LookupWorkflow,
        parentUid: AppMenu.Lookup,
        parentUrl: '/organization/workflow',
        title: props.intl.formatMessage(organizationMessage.workflowSetup.page.detailTitle),
        description: props.intl.formatMessage(organizationMessage.workflowSetup.page.detailSubHeader)
      }}

      // state & fields
      state={props.organizationWorkflowState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}

      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push(`/organization/workflow/form`, { menuUid: props.match.params.menuUid, companyUid: props.match.params.companyUid })}
        >
          <BorderColor/>
        </IconButton>
      }

      // row components
      summaryComponent={(item: IWorkflow) => (
        <OrganizationWorkflowSummary data={item} />
      )}
    />
  </React.Fragment>
);