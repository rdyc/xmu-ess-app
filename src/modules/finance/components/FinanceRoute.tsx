import { ApprovalDetail } from '@finance/components/approval/detail/ApprovalDetail';
import { ApprovalList } from '@finance/components/approval/list/ApprovalList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

type AllProps 
  = RouteComponentProps;

const approvalListComponent = () => <ApprovalList orderBy="uid" direction="descending"/>;
const approvalDetailComponent = () => <ApprovalDetail/>;

export const FinanceRoute: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={approvalListComponent} />
    <Route path={`${props.match.path}/details/:financeUid`} component={approvalDetailComponent} />
  </Switch>
);