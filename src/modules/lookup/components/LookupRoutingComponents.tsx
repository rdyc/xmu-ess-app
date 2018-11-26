import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { CompanyDetail } from './company/detail/CompanyDetail';
import { CompanyList } from './company/list/CompanyList';

const company = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/list`} component={CompanyList} />
    <Route path={`${props.match.path}/:companyUid`} component={CompanyDetail} />
  </Switch>
);

export const LookupRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/company`} component={company} />
    </Layout>
  </Switch>
);