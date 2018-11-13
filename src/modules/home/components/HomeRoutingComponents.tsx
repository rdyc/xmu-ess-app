import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { Dashboard } from './dashboard';

const home = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/dashboard`} component={Dashboard} />
  </Switch>
);

export const HomeRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Layout>
    <Route path={`${props.match.path}`} component={home} />
  </Layout>
);