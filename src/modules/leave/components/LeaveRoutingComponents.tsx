import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { LeaveApprovalDetail } from './approval/detail/LeaveApprovalDetail';
import { LeaveApprovalList } from './approval/list/LeaveApprovalList';
import { LeaveCancellationList } from './cancellation/list/LeaveCancellationList';
import { LeaveRequestDetail } from './request/detail/LeaveRequestDetail';
import LeaveRequestEditor from './request/editor/LeaveRequestEditor';
import { LeaveRequestList } from './request/list/LeaveRequestList';

const request = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LeaveRequestEditor} />
    <Route path={`${props.match.path}/:leaveUid`} component={LeaveRequestDetail} />
    <Route path={`${props.match.path}`} component={LeaveRequestList} />
  </Switch>
);

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:leaveUid`} component={LeaveApprovalDetail} />
    <Route path={`${props.match.path}`} component={LeaveApprovalList} />
  </Switch>
);

const cancellation = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={LeaveCancellationList} />
  </Switch>
);

export const LeaveRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/requests`} component={request} />
      <Route path={`${props.match.path}/approvals`} component={approval} />
      <Route path={`${props.match.path}/cancellations`} component={cancellation} />
    </Layout>
  </Switch>
);