import { ProjectRegistrationDetail } from '@project/components/registration/detail/ProjectRegistrationDetail';
import RegistrationEditor from '@project/components/registration/editor/ProjectRegistrationEditor';
import { ProjectRegistrationList } from '@project/components/registration/list/ProjectRegistrationList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { ProjectAcceptanceDetail } from './acceptance/detail/ProjectAcceptanceDetail';
import { ProjectAcceptanceList } from './acceptance/list/ProjectAcceptanceList';
import { ProjectApprovalDetail } from './approval/detail/ProjectApprovalDetail';
import { ProjectApprovalList } from './approval/list/ProjectApprovalList';
import { ProjectAssignmentDetail } from './assignment/detail/ProjectAssignmentDetail';
import { ProjectAssignmentEditorForm } from './assignment/editor/ProjectAssignmentEditor';
import { ProjectAssignmentList } from './assignment/list/ProjectAssignmentList';
import { OwnerEditor } from './owner/editor/OwnerEditor';
import { SiteEditor } from './sites/SiteEditor';
import { StatusEditor } from './status/StatusEditor';

const request = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/owner`} component={OwnerEditor} />
    <Route path={`${props.match.path}/status`} component={StatusEditor} />
    <Route path={`${props.match.path}/sites/:companyUid/:projectUid`} component={SiteEditor} />
    <Route path={`${props.match.path}/form`} component={RegistrationEditor} />
    <Route path={`${props.match.path}/:projectUid`} component={ProjectRegistrationDetail} />
    <Route path={`${props.match.path}`} component={ProjectRegistrationList} />
  </Switch>
);

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:projectUid`} component={ProjectApprovalDetail} />
    <Route path={`${props.match.path}`} component={ProjectApprovalList} />
  </Switch>
);

const assignment = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={ProjectAssignmentEditorForm} />
    <Route path={`${props.match.path}/:assignmentUid`} component={ProjectAssignmentDetail} />
    <Route path={`${props.match.path}`} component={ProjectAssignmentList} />
  </Switch>
);

const acceptance = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:assignmentUid/:assignmentItemUid`} component={ProjectAcceptanceDetail} />
    <Route path={`${props.match.path}`} component={ProjectAcceptanceList} />
  </Switch>
);

export const ProjectRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/requests`} component={request} />
    <Route path={`${props.match.path}/approvals`} component={approval} />
    <Route path={`${props.match.path}/assignments`} component={assignment} />
    <Route path={`${props.match.path}/acceptances`} component={acceptance} />
  </Switch>
);