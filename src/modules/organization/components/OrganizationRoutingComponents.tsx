import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { OrganizationHierarchyDetail } from './hierarchy/detail/OrganizationHierarchyDetail';
import { OrganizationHierarchyListView } from './hierarchy/list/OrganizationHierarchyListView';

const OrganizationHierarchy = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:hierarchyUid`} component={OrganizationHierarchyDetail} />
    <Route path={`${props.match.path}`} component={OrganizationHierarchyListView} />
  </Switch>
);

export const OrganizationRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/hierarchy`} component={OrganizationHierarchy} />
    </Layout>
  </Switch>
);