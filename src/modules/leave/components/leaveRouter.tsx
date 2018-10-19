import { RequestDetail } from '@leave/components/request/detail/RequestDetail';
import RequestEditor from '@leave/components/request/editor/RequestEditor';
import { RequestList } from '@leave/components/request/list/RequestList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

type AllProps 
  = RouteComponentProps;

const listComponent = () => (
  <RequestList orderBy="uid" direction="descending"/>
);

const detailComponent = () => (
  <RequestDetail/>
);

const editorComponent = () => (
  <RequestEditor/>
);

export const leaveRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={listComponent} />
    <Route path={`${props.match.path}/details/:leaveUid`} component={detailComponent} />
    <Route path={`${props.match.path}/form`} component={editorComponent} />
  </Switch>
);