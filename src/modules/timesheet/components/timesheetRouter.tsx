import { TimesheetEntryDetail } from '@timesheet/components/entry/detail/TimesheetEntryDetail';
import { TimesheetEntryList } from '@timesheet/components/entry/list/TimesheetEntryList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { TimesheetApprovalDetail } from './approval/detail/TimesheetApprovalDetail';
import { TimesheetApprovalListEditor } from './approval/editor/TimesheetApprovalListEditor';
import { TimesheetApprovalList } from './approval/list/TimesheetApprovalList';
import TimesheetEntryEditor from './entry/editor/TimesheetEntryEditor';

type AllProps 
  = RouteComponentProps;

const listComponent = () => (
  <TimesheetEntryList orderBy="uid" direction="descending"/>
);
const detailComponent = () => (
  <TimesheetEntryDetail/>
);

const editorComponent = () => (
  <TimesheetEntryEditor/>
);
const approvalListComponent = () => (
  <TimesheetApprovalList orderBy="uid" direction="descending"/>
);
const approvalDetailComponent = () => (
  <TimesheetApprovalDetail/>
);
const approvalListEditorComponent = () => (
  <TimesheetApprovalListEditor orderBy="uid" direction="descending"/>
);

export const timesheetRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route exact path={`${props.match.path}/entry`} component={editorComponent} />
    <Route path={`${props.match.path}/entry/history`} component={listComponent} />
    <Route path={`${props.match.path}/details/:timesheetUid`} component={detailComponent} />
    <Route path={`${props.match.path}/form`} component={editorComponent} />
  </Switch>
);

export const timesheetApprovalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route exact path={`${props.match.path}/`} component={approvalListEditorComponent}/>
    <Route path={`${props.match.path}/history`} component={approvalListComponent}/>
    <Route path={`${props.match.path}/details/:timesheetUid`} component={approvalDetailComponent} />
  </Switch>
);