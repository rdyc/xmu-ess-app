// import { LeaveApprovalDetail } from '@leave/components/approval/detail/LeaveApprovalDetail';
import { LeaveApprovalList } from '@leave/components/approval/list/LeaveApprovalList';
import { LeaveRequestDetail } from '@leave/components/request/detail/LeaveRequestDetail';
import RequestEditor from '@leave/components/request/editor/LeaveRequestEditor';
import { LeaveRequestList } from '@leave/components/request/list/LeaveRequestList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { LeaveApprovalEditor } from './approval/editor/LeaveApprovalEditor';

type AllProps 
  = RouteComponentProps;

const requestListComponent = () => (
  <LeaveRequestList orderBy="uid" direction="descending"/>
);

const requestDetailComponent = () => (
  <LeaveRequestDetail/>
);

const requestEditorComponent = () => (
  <RequestEditor/>
);

const approvalListComponent = () => (
  <LeaveApprovalList orderBy="uid" direction="descending"/>
);

const approvalEditorComponent = () => (
  <LeaveApprovalEditor/>
);

export const leaveRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={requestListComponent} />
    <Route path={`${props.match.path}/details/:leaveUid`} component={requestDetailComponent} />
    <Route path={`${props.match.path}/form`} component={requestEditorComponent} />
  </Switch>
);

export const approvalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route exact path={`${props.match.path}`} component={approvalListComponent} />
    <Route path={`${props.match.path}/:leaveUid`} component={approvalEditorComponent} />
  </Switch>
);