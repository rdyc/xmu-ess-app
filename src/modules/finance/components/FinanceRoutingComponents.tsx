import { ApprovalDetail } from '@finance/components/approval/detail/ApprovalDetail';
import { FinanceApprovalList } from '@finance/components/approval/list/FinanceApprovalList';
import { ApprovalPayment } from '@finance/components/approval/payment/ApprovalPayment';
import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/payment/:financeUids`} component={ApprovalPayment} />
    <Route path={`${props.match.path}/:financeUid`} component={ApprovalDetail} />
    <Route path={`${props.match.path}`} component={FinanceApprovalList} />
  </Switch>
);

export const FinanceRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/approvals`} component={approval} />
    </Layout>
  </Switch>
);