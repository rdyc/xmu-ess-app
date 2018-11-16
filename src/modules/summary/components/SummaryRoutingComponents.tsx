import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { BillableList } from '@summary/components/billable/BillableList';
import { Effectiveness } from '@summary/components/effectiveness/Effectiveness';
import { Profitability } from '@summary/components/profitability/Profitability';
import { Progress } from '@summary/components/progress/Progress';

export const SummaryRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/billable/`} component={BillableList}/>
      <Route path={`${props.match.path}/effectiveness/`} component={Effectiveness}/>
      <Route path={`${props.match.path}/profitability/`} component={Profitability}/>
      <Route path={`${props.match.path}/progress/`} component={Progress}/>
    </Layout>
  </Switch>
);
