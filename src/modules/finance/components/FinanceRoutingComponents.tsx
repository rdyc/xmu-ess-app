import { FinanceApprovalDetail } from '@finance/components/approval/detail/FinanceApprovalDetail';
import { FinanceApprovalList } from '@finance/components/approval/list/FinanceApprovalList';
import { FinanceApprovalPayment } from '@finance/components/approval/payment/FinanceApprovalPayment';
import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/payment/:financeUids`} component={FinanceApprovalPayment} />
    <Route path={`${props.match.path}/:financeUid`} component={FinanceApprovalDetail} />
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