import { TimesheetEntryDetail } from '@timesheet/components/entry/detail/TimesheetEntryDetail';
import TimesheetEntryEditor from '@timesheet/components/entry/editor/TimesheetEntryEditor';
import { TimesheetEntryList } from '@timesheet/components/entry/list/TimesheetEntryList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

type AllProps 
  = RouteComponentProps;

const entryListComponent = () => <TimesheetEntryList orderBy="uid" direction="descending"/>;
const entryDetailComponent = () => <TimesheetEntryDetail/>;
const entryEditorComponent = () => <TimesheetEntryEditor/>;

export const timesheetEntryRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route exact path={`${props.match.path}/entry`} component={entryEditorComponent} />
    <Route path={`${props.match.path}/entry/history`} component={entryListComponent} />
    <Route path={`${props.match.path}/details/:timesheetUid`} component={entryDetailComponent} />
    <Route path={`${props.match.path}/form`} component={entryEditorComponent} />
  </Switch>
);