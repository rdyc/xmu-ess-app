import { ApprovalEditor } from '@expense/components/approval/editor/ApprovalEditor';
import { ApprovalList } from '@expense/components/approval/list/ApprovalList';
import { RequestDetail } from '@expense/components/request/detail/RequestDetail';
import RequestEditor from '@expense/components/request/editor/RequestEditor';
import { RequestList } from '@expense/components/request/list/RequestList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

type AllProps 
  = RouteComponentProps;

const listComponent = () => (
  <RequestList orderBy="uid" direction="descending"/>
);

const detailComponent = () => (
  <RequestDetail/>
);

const editorComponent = () => (
  <RequestEditor/>
);

const approvalListComponent = () => (
  <ApprovalList orderBy="uid" direction="descending"/>
);

const approvalEditorComponent = () => (
  <ApprovalEditor/>
);

export const ExpenseRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/request/list/`} component={listComponent} />
    <Route path={`${props.match.path}/details/:expenseUid`} component={detailComponent} />
    <Route path={`${props.match.path}/form`} component={editorComponent} />
  </Switch>
);

export const ExpenseApprovalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={approvalListComponent} />
    <Route path={`${props.match.path}/details/:expenseUid`} component={approvalEditorComponent} />
  </Switch>
);