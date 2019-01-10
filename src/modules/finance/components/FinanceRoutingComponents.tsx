import { FinanceApprovalDetail } from '@finance/components/approval/detail/FinanceApprovalDetail';
import { FinanceApprovalList } from '@finance/components/approval/list/FinanceApprovalList';
import { FinanceApprovalPayment } from '@finance/components/approval/payment/FinanceApprovalPayment';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/payment`} component={FinanceApprovalPayment} />
    <Route path={`${props.match.path}/:financeUid`} component={FinanceApprovalDetail} />
    <Route path={`${props.match.path}`} component={FinanceApprovalList} />
  </Switch>
);

export const FinanceRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/approvals`} component={approval} />
  </Switch>
);