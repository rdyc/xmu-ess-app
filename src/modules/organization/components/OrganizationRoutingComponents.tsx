import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { OrganizationHierarchyDetail } from './hierarchy/detail/OrganizationHierarchyDetail';
import OrganizationHierarchyEditor from './hierarchy/editor/OrganizationHierarchyEditor';
import OrganizationHierarchyList from './hierarchy/list/OrganizationHierarchyList';
import { OrganizationWorkflowDetail } from './workflow/request/detail/OrganizationWorkflowDetail';
import OrganizationWorkflowEditor from './workflow/request/editor/OrganizationWorkflowEditor';
import { workflowMenuList } from './workflow/request/list/WorkflowMenuList';

const OrganizationHierarchy = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={OrganizationHierarchyEditor} />
    <Route path={`${props.match.path}/:hierarchyUid`} component={OrganizationHierarchyDetail} />
    <Route path={`${props.match.path}`} component={OrganizationHierarchyList} />
  </Switch>
);

const OrganizationWorkflow = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={OrganizationWorkflowEditor} />
    <Route path={`${props.match.path}/:companyUid/:menuUid`} component={OrganizationWorkflowDetail} />
    <Route path={`${props.match.path}`} component={workflowMenuList} />
  </Switch>
);

export const OrganizationRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/hierarchy`} component={OrganizationHierarchy} />
      <Route path={`${props.match.path}/workflow`} component={OrganizationWorkflow} />
    </Layout>
  </Switch>
);