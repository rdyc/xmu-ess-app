import { EntryDetail } from '@timesheet/components/entry/detail/EntryDetail';
import { EntryList } from '@timesheet/components/entry/list/EntryList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import EntryEditor from './entry/editor/EntryEditor';

type AllProps 
  = RouteComponentProps;

const listComponent = () => (
  <EntryList orderBy="uid" direction="descending"/>
);
const detailComponent = () => (
  <EntryDetail/>
);

const editorComponent = () => (
  <EntryEditor/>
);

export const timesheetRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/entry/history`} component={listComponent} />
    <Route path={`${props.match.path}/details/:timesheetUid`} component={detailComponent} />
    {/* <Route path={`${props.match.path}/sites/:projectUid`} component={ProjectSiteContainer} /> */}
    <Route path={`${props.match.path}/form`} component={editorComponent} />
  </Switch>
);