import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { LeaveApprovalDetail } from './approval/detail/LeaveApprovalDetail';
import { LeaveApprovalList } from './approval/list/LeaveApprovalList';
import { LeaveCancellationDetail } from './cancellation/detail/LeaveCancellationDetail';
import { LeaveCancellationList } from './cancellation/list/LeaveCancellationList';
import { LeaveRequestDetail } from './request/detail/LeaveRequestDetail';
import { LeaveRequestForm } from './request/form/LeaveRequestForm';
import { LeaveRequestList } from './request/list/LeaveRequestList';

const request = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LeaveRequestForm} />
    <Route path={`${props.match.path}/:leaveUid`} component={LeaveRequestDetail} />
    <Route path={`${props.match.path}`} component={LeaveRequestList} />
  </Switch>
);

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:leaveUid`} component={LeaveApprovalDetail} />
    <Route path={`${props.match.path}`} component={LeaveApprovalList} />
  </Switch>
);

const cancellation = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:leaveUid`} component={LeaveCancellationDetail} />
    <Route path={`${props.match.path}`} component={LeaveCancellationList} />
  </Switch>
);

export const LeaveRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/requests`}
      menu={AppMenu.Leave} 
      subMenu={AppMenu.LeaveRequest} 
      component={request} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/approvals`}
      menu={AppMenu.Leave} 
      subMenu={AppMenu.LeaveApproval} 
      component={approval} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/cancellations`}
      menu={AppMenu.Leave} 
      subMenu={AppMenu.LeaveCancelation} 
      component={cancellation} 
    />
  </Switch>
);