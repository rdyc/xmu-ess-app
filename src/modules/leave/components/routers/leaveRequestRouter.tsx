import { LeaveRequestDetail } from '@leave/components/request/detail/LeaveRequestDetail';
import LeaveRequestEditor from '@leave/components/request/editor/LeaveRequestEditor';
import { LeaveRequestList } from '@leave/components/request/list/LeaveRequestList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

type AllProps 
  = RouteComponentProps;

const requestListComponent = () => <LeaveRequestList orderBy="uid" direction="descending"/>;
const requestDetailComponent = () => <LeaveRequestDetail/>;
const requestEditorComponent = () => <LeaveRequestEditor/>;

export const leaveRequestRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={requestListComponent} />
    <Route path={`${props.match.path}/details/:leaveUid`} component={requestDetailComponent} />
    <Route path={`${props.match.path}/form`} component={requestEditorComponent} />
  </Switch>
);