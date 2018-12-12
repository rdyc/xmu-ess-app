import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { StructureList } from './structure/list/StructureList';

const OrganizationStructure = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={StructureList} />
  </Switch>
);

export const OrganizationRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/structure`} component={OrganizationStructure} />
    </Layout>
  </Switch>
);