import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { ProjectAssignmentDetail } from '../assignment/detail/ProjectAssignmentDetail';
import { ProjectAssignmentEditor } from '../assignment/editor/ProjectAssignmentEditor';
import { ProjectAssignmentList } from '../assignment/list/ProjectAssignmentList';

type AllProps 
  = RouteComponentProps;

const assignmentListComponent = () => <ProjectAssignmentList orderBy="uid" direction="descending"/>;
const assignmentDetailComponent = () => <ProjectAssignmentDetail/>;
const assignmentEditorComponent = () => <ProjectAssignmentEditor/>;

export const projectAssignmentRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list`} component={assignmentListComponent} />
    <Route path={`${props.match.path}/details/:assignmentUid`} component={assignmentDetailComponent} />
    <Route path={`${props.match.path}/form`} component={assignmentEditorComponent} />
  </Switch>
);