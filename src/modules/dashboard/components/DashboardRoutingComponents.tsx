import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';

import { Home } from './default';

export const DashboardRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Layout>
    <Route path={`${props.match.path}`} component={Home} />
  </Layout>
);