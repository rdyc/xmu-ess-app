import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import { ProjectRegistrationDetail } from '@project/components/registration/detail/ProjectRegistrationDetail';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { ProjectAcceptanceApproval } from './acceptance/approval/ProjectAcceptanceApproval';
import { ProjectAcceptanceDetail } from './acceptance/detail/ProjectAcceptanceDetail';
import { ProjectAcceptanceList } from './acceptance/list/ProjectAcceptanceList';
import { ProjectAdministrationList } from './administration/list/ProjectAdministrationList';
import { ProjectApprovalDetail } from './approval/detail/ProjectApprovalDetail';
import { ProjectApprovalList } from './approval/list/ProjectApprovalList';
import { ProjectAssignmentDetail } from './assignment/detail/ProjectAssignmentDetail';
import { ProjectAssignmentEditorForm } from './assignment/editor/ProjectAssignmentEditor';
import { ProjectAssignmentList } from './assignment/list/ProjectAssignmentList';
import { HourEditor } from './hour/editor/HourEditor';
import { OwnerEditor } from './owner/editor/OwnerEditor';
import { ProjectRegistrationForm } from './registration/form/ProjectRegistrationForm';
import { ProjectRegistrationList } from './registration/list/ProjectRegistrationList';
import { SiteEditor } from './sites/SiteEditor';
import { StatusEditor } from './status/StatusEditor';

const request = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/hour`} component={HourEditor} />
    <Route path={`${props.match.path}/owner`} component={OwnerEditor} />
    <Route path={`${props.match.path}/status`} component={StatusEditor} />
    <Route path={`${props.match.path}/sites/:companyUid/:projectUid`} component={SiteEditor} />
    <Route path={`${props.match.path}/form`} component={ProjectRegistrationForm} />
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
    <Route path={`${props.match.path}/:assignmentUid/:assignmentItemUid`} component={ProjectAcceptanceApproval} />
    <Route path={`${props.match.path}/:assignmentUid`} component={ProjectAcceptanceDetail} />
    <Route path={`${props.match.path}`} component={ProjectAcceptanceList} />
  </Switch>
);

const administration = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={ProjectRegistrationEditor} />
    <Route path={`${props.match.path}/:projectUid`} component={ProjectRegistrationDetail} />
    <Route path={`${props.match.path}`} component={ProjectAdministrationList} />
  </Switch>
);

export const ProjectRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/requests`}
      menu={AppMenu.ProjectRegistration} 
      subMenu={AppMenu.ProjectRegistrationRequest} 
      component={request} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/approvals`} 
      menu={AppMenu.ProjectRegistration} 
      subMenu={AppMenu.ProjectRegistrationApproval} 
      component={approval}
    />
    <SecureMenuRoute 
      path={`${props.match.path}/assignments`} 
      menu={AppMenu.ProjectAssignment} 
      subMenu={AppMenu.ProjectAssignmentRequest} 
      component={assignment}
    />
    <SecureMenuRoute 
      path={`${props.match.path}/acceptances`} 
      menu={AppMenu.ProjectAssignment} 
      subMenu={AppMenu.ProjectAssignmentAcceptance} 
      component={acceptance}
    />
    <SecureMenuRoute 
      path={`${props.match.path}/administrations`} 
      menu={AppMenu.ProjectRegistration} 
      subMenu={AppMenu.ProjectAdmnistration} 
      component={administration}
    />
  </Switch>
);