import AppMenu from '@constants/AppMenu';
import { FinanceApprovalDetail } from '@finance/components/approval/detail/FinanceApprovalDetail';
import { FinanceApprovalList } from '@finance/components/approval/list/FinanceApprovalList';
import { FinanceApprovalPayment } from '@finance/components/approval/payment/FinanceApprovalPayment';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
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
    <SecureMenuRoute 
      path={`${props.match.path}/approvals`}
      menu={AppMenu.Finance} 
      subMenu={AppMenu.FinanceApproval} 
      component={approval} 
    />
  </Switch>
);