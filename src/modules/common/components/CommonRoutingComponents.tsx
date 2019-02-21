import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { CommonDetail } from './detail/CommonDetail';
import CommonEditor from './editor/CommonEditor';
import { CommonList } from './list/CommonList';
import { CommonSummary } from './summary/CommonSummary';

const CommonSystem = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:category/form`} component={CommonEditor} />
    <Route path={`${props.match.path}/:category/:id`} component={CommonDetail} />
    <Route path={`${props.match.path}/:category`} component={CommonList} />
    <Route path={`${props.match.path}`} component={CommonSummary} />
  </Switch>
);

export const CommonRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/system`} component={CommonSystem} />
  </Switch>
);