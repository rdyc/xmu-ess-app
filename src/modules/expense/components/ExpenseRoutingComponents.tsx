import { ExpenseApprovalDetail } from '@expense/components/approval/detail/ExpenseApprovalDetail';
import { ExpenseApprovalListView } from '@expense/components/approval/list/ExpenseApprovalListView';
import { ExpenseRequestDetail } from '@expense/components/request/detail/ExpenseRequestDetail';
import RequestEditor from '@expense/components/request/editor/RequestEditor';
import { ExpenseRequestListView } from '@expense/components/request/list/ExpenseRequestListView';
import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

const request = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={RequestEditor} />
    <Route path={`${props.match.path}/:expenseUid`} component={ExpenseRequestDetail} />
    <Route path={`${props.match.path}`} component={ExpenseRequestListView} />
  </Switch>
);

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:expenseUid`} component={ExpenseApprovalDetail} />
    <Route path={`${props.match.path}`} component={ExpenseApprovalListView} />
  </Switch>
);

export const ExpenseRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/requests`} component={request} />
      <Route path={`${props.match.path}/approvals`} component={approval} />
    </Layout>
  </Switch>
);