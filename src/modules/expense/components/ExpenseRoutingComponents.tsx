import { ApprovalDetail } from '@expense/components/approval/detail/ApprovalDetail';
import { ApprovalListView } from '@expense/components/approval/list/ApprovalListView';
import { RequestDetailView } from '@expense/components/request/detail/RequestDetailView';
import RequestEditor from '@expense/components/request/editor/RequestEditor';
import { RequestListView } from '@expense/components/request/list/RequestListView';
import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

const RequestList = () => <RequestListView />;
const RequestDetail = () => <RequestDetailView />;
const ApprovalList = () => <ApprovalListView />;
// const ApprovalDetail = () => <ApprovalDetailView />;

const request = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={RequestEditor} />
    <Route path={`${props.match.path}/:expenseUid`} component={RequestDetail} />
    <Route path={`${props.match.path}`} component={RequestList} />
  </Switch>
);

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:expenseUid`} component={ApprovalDetail} />
    <Route path={`${props.match.path}`} component={ApprovalList} />
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