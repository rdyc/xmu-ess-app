import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { MileageExceptionDetail } from './mileageException/detail/MileageExceptionDetail';
import { MileageExceptionList } from './mileageException/list/LookupMileageExceptionListView';
import { LookupRoleDetail } from './role/detail/LookupRoleDetail';
import { LookupRoleList } from './role/list/LookupRoleList';

const role = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/list`} component={LookupRoleList} />
    <Route path={`${props.match.path}/:roleUid`} component={LookupRoleDetail} />
  </Switch>
);

const mileageException = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:mileageExceptionUid`} component={MileageExceptionDetail} />
    <Route path={`${props.match.path}`} component={MileageExceptionList} />
   </Switch>
);

export const LookupRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/roles`} component={role} />
      <Route path={`${props.match.path}/mileageexception`} component={mileageException} />
    </Layout>
  </Switch>
);