import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { LeaveApprovalDetail } from '../approval/detail/LeaveApprovalDetail';
import { LeaveApprovalList } from '../approval/list/LeaveApprovalList';

type AllProps = RouteComponentProps;

const approvalListComponent = () => <LeaveApprovalList  orderBy="uid" direction="descending"/>;
const approvalDetailComponent = () => <LeaveApprovalDetail/>;

export const leaveApprovalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route exact path={`${props.match.path}/`} component={approvalListComponent} />
    <Route path={`${props.match.path}/details/:leaveUid`} component={approvalDetailComponent} />
  </Switch>
);