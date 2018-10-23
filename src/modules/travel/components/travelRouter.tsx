import { RequestDetail } from '@travel/components/request/detail/RequestDetail';
import RequestEditor from '@travel/components/request/editor/RequestEditor';
import { RequestList } from '@travel/components/request/list/RequestList';
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

export const travelRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/request`} component={listComponent} />
    <Route path={`${props.match.path}/details/:travelUid`} component={detailComponent} />
    <Route path={`${props.match.path}/form`} component={editorComponent} />
  </Switch>
);