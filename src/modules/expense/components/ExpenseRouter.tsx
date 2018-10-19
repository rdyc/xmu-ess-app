// import ExpenseApprovalDetail from '@expense/components/approval/ExpenseApprovalDetail';
// import ExpenseApprovalList from '@expense/components/approval/ExpenseApprovalList';
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

export const ExpenseRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/request/list/`} component={listComponent} />
    <Route path={`${props.match.path}/details/:expenseUid`} component={detailComponent} />
    <Route path={`${props.match.path}/form`} component={editorComponent} />
    {/* <Route path={`${props.match.path}/approval/list/`} component={ExpenseApprovalList} />
    <Route path={`${props.match.path}/details/:expenseUid`} component={ExpenseApprovalDetail} /> */}
  </Switch>
);