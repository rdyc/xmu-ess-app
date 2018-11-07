import { ApprovalDetail } from '@finance/components/approval/detail/ApprovalDetail';
import { ApprovalList } from '@finance/components/approval/list/ApprovalList';
import { ApprovalPayment } from '@finance/components/approval/payment/ApprovalPayment';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

type AllProps 
  = RouteComponentProps;

const approvalListComponent = () => <ApprovalList orderBy="uid" direction="descending"/>;
const approvalDetailComponent = () => <ApprovalDetail/>;
const approvalPaymentComponent = () => <ApprovalPayment/>;

export const FinanceApprovalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={approvalListComponent} />
    <Route path={`${props.match.path}/details/:financeUid`} component={approvalDetailComponent} />
    <Route path={`${props.match.path}/payment/:financeUids`} component={approvalPaymentComponent} />
  </Switch>
);