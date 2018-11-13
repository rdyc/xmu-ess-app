import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { BillableList } from '@summary/components/billable/BillableList';

export const SummaryRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/billable/`} component={BillableList}/>
    </Layout>
  </Switch>
);
