import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { OrganizationHierarchyDetail } from './hierarchy/detail/OrganizationHierarchyDetail';
import { OrganizationHierarchyForm } from './hierarchy/form/OrganizationHierarchyForm';
import { OrganizationHierarchyList } from './hierarchy/list/OrganizationHierarchyList';
import { StructureDetail } from './structure/detail/StructureDetail';
import OrganizationStructureEditor from './structure/editor/OrganizationStructureEditor';
import { StructureList } from './structure/list/StructureList';
import { OrganizationWorkflowDetail } from './workflow/request/detail/OrganizationWorkflowDetail';
import { OrganizationWorkflowForm } from './workflow/request/form/OrganizationWorkFlowForm';
import { workflowMenuList } from './workflow/request/list/WorkflowMenuList';

const OrganizationHierarchy = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={OrganizationHierarchyForm} />
    <Route path={`${props.match.path}/:hierarchyUid`} component={OrganizationHierarchyDetail} />
    <Route path={`${props.match.path}`} component={OrganizationHierarchyList} />
  </Switch>
);

const OrganizationStructure = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={OrganizationStructureEditor} />
    <Route path={`${props.match.path}/:structureUid`} component={StructureDetail} />
    <Route path={`${props.match.path}`} component={StructureList} />
  </Switch>
);

const OrganizationWorkflow = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={OrganizationWorkflowForm} />
    <Route path={`${props.match.path}/:companyUid/:menuUid`} component={OrganizationWorkflowDetail} />
    <Route path={`${props.match.path}`} component={workflowMenuList} />
    </Switch>
);

export const OrganizationRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/hierarchy`} component={OrganizationHierarchy} />
    <Route path={`${props.match.path}/structure`} component={OrganizationStructure} />
    <Route path={`${props.match.path}/workflow`} component={OrganizationWorkflow} />
  </Switch>
);