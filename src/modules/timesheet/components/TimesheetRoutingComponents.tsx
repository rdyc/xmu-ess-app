import { Layout } from '@layout/components/base';
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

const entry = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={TimesheetEntryEditor} />
    <Route path={`${props.match.path}/history`} component={TimesheetEntryList} />
    <Route path={`${props.match.path}/:timesheetUid`} component={TimesheetEntryDetail} />
    <Route path={`${props.match.path}`} component={TimesheetEntryEditor} />
  </Switch>
);

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/action/:timesheetUids`} component={ActionApproval} />
    <Route path={`${props.match.path}/history`} component={TimesheetApprovalHistoryList} />
    <Route path={`${props.match.path}/:timesheetUid`} component={TimesheetApprovalHistoryDetail} />
    <Route path={`${props.match.path}/:timesheetUid`} component={TimesheetApprovalDetail} />
    <Route path={`${props.match.path}`} component={TimesheetApprovalList} />
  </Switch>
);

export const TimesheetRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/entry`} component={entry} />
      <Route path={`${props.match.path}/approval`} component={approval} />
    </Layout>
  </Switch>
);