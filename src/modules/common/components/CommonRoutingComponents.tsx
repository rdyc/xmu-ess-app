import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { CommonSummary } from './summary/CommonSummary';

export const CommonRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}`} component={CommonSummary} />
    </Layout>
  </Switch>
);