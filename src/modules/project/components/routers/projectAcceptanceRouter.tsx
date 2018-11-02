import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { ProjectApprovalDetail } from '../approval/detail/ProjectApprovalDetail';
import { ProjectApprovalList } from '../approval/list/ProjectApprovalList';

type AllProps = RouteComponentProps;

const approvalListComponent = () => <ProjectApprovalList  orderBy="uid" direction="descending"/>;
const approvalDetailComponent = () => <ProjectApprovalDetail/>;

export const projectAcceptanceRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list`} component={approvalListComponent} />
    <Route path={`${props.match.path}/details/:projectUid`} component={approvalDetailComponent} />
  </Switch>
);