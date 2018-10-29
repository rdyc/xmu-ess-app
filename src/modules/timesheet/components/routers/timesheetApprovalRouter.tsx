import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { TimesheetApprovalList } from '../approval/timesheetApproval/list/TimesheetApprovalList';
import { TimesheetApprovalHistoryDetail } from '../approval/timesheetApprovalHistory/detail/TimesheetApprovalHistoryDetail';
import { TimesheetApprovalHistoryList } from '../approval/timesheetApprovalHistory/list/TimesheetApprovalHistoryList';

type AllProps = RouteComponentProps;

const approvalHistoryListComponent = () => <TimesheetApprovalHistoryList orderBy="uid" direction="descending"/>;
const approvalHistoryDetailComponent = () => <TimesheetApprovalHistoryDetail/>;

const approvalListComponent = () => <TimesheetApprovalList orderBy="uid" direction="descending"/>;

export const timesheetApprovalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route exact path={`${props.match.path}/`} component={approvalListComponent}/>
  
    <Route path={`${props.match.path}/history`} component={approvalHistoryListComponent}/>
    <Route path={`${props.match.path}/details/:timesheetUid`} component={approvalHistoryDetailComponent} />
  </Switch>
);