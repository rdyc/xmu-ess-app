import AppMenu from '@constants/AppMenu';
import { ExpenseApprovalDetail } from '@expense/components/approval/detail/ExpenseApprovalDetail';
import { ExpenseApprovalList } from '@expense/components/approval/list/ExpenseApprovalList';
import { ExpenseRequestDetail } from '@expense/components/request/detail/ExpenseRequestDetail';
import { ExpenseRequestList } from '@expense/components/request/list/ExpenseRequestList';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { ExpenseRequestForm } from './request/form/ExpenseRequestForm';

const request = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={ExpenseRequestForm} />
    <Route path={`${props.match.path}/:expenseUid`} component={ExpenseRequestDetail} />
    <Route path={`${props.match.path}`} component={ExpenseRequestList} />
  </Switch>
);

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:expenseUid`} component={ExpenseApprovalDetail} />
    <Route path={`${props.match.path}`} component={ExpenseApprovalList} />
  </Switch>
);

export const ExpenseRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/requests`}
      menu={AppMenu.Expense} 
      subMenu={AppMenu.ExpenseRequest} 
      component={request} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/approvals`}
      menu={AppMenu.Expense} 
      subMenu={AppMenu.ExpenseApproval} 
      component={approval} 
    />
  </Switch>
);