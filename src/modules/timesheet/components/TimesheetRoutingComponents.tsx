import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { TimesheetApprovalDetail } from './approval/timesheetApproval/detail/TimesheetApprovalDetail';
import { ActionApproval } from './approval/timesheetApproval/formApproval/ActionApproval';
import { TimesheetApprovalList } from './approval/timesheetApproval/list/TimesheetApprovalList';
import { TimesheetApprovalHistoryDetail } from './approval/timesheetApprovalHistory/detail/TimesheetApprovalHistoryDetail';
import { TimesheetApprovalHistoryList } from './approval/timesheetApprovalHistory/list/TimesheetApprovalHistoryList';
import { TimesheetEntryDetail } from './entry/detail/TimesheetEntryDetail';
import TimesheetEntryEditor from './entry/editor/TimesheetEntryEditor';
import { TimesheetEntryList } from './entry/list/TimesheetEntryList';

const request = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={TimesheetEntryEditor} />
    <Route path={`${props.match.path}/:timesheetUid`} component={TimesheetEntryDetail} />
    <Route path={`${props.match.path}`} component={TimesheetEntryList} />
  </Switch>
);

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/action`} component={ActionApproval} />
    <Route path={`${props.match.path}/history/:timesheetUid`} component={TimesheetApprovalHistoryDetail} />
    <Route path={`${props.match.path}/history`} component={TimesheetApprovalHistoryList} />
    <Route path={`${props.match.path}/:timesheetUid`} component={TimesheetApprovalDetail} />
    <Route path={`${props.match.path}`} component={TimesheetApprovalList} />
  </Switch>
);

export const TimesheetRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/requests`}
      menu={AppMenu.Timesheet} 
      subMenu={AppMenu.TimesheetRequest} 
      component={request} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/approvals`}
      menu={AppMenu.Timesheet} 
      subMenu={AppMenu.TimesheetApproval} 
      component={approval} 
    />
  </Switch>
);