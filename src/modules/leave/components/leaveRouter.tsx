import { ApprovalDetail } from '@leave/components/approval/detail/ApprovalDetail';
import { ApprovalList } from '@leave/components/approval/list/ApprovalList';
import { RequestDetail } from '@leave/components/request/detail/RequestDetail';
import RequestEditor from '@leave/components/request/editor/RequestEditor';
import { RequestList } from '@leave/components/request/list/RequestList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

type AllProps 
  = RouteComponentProps;

const requestListComponent = () => (
  <RequestList orderBy="uid" direction="descending"/>
);

const requestDetailComponent = () => (
  <RequestDetail/>
);

const requestEditorComponent = () => (
  <RequestEditor/>
);

const approvalListComponent = () => (
  <ApprovalList orderBy="uid" direction="descending"/>
);

const approvalDetailComponent = () => (
  <ApprovalDetail/>
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
    <Route path={`${props.match.path}/:leaveUid`} component={approvalDetailComponent} />
  </Switch>
);