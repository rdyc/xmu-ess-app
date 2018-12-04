import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { MileageExceptionDetail } from './mileageException/detail/MileageExceptionDetail';
import { MileageExceptionList } from './mileageException/list/LookupMileageExceptionListView';
import { LookupRoleDetail } from './role/detail/LookupRoleDetail';
import LookupRoleEditor from './role/editor/LookupRoleEditor';
import { LookupRoleList } from './role/list/LookupRoleList';
import { LookupSystemLimitDetail } from './systemLimit/detail/LookupSystemLimitDetail';
import LookupSystemLimitEditor from './systemLimit/editor/LookupSystemLimitEditor';
// import { LookupSystemLimitListView } from './systemLimit/list/LookupSystemLimitListView';
import LookupSystemLimitList from './systemLimit/list/LookupSystemLimitList';

const role = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupRoleEditor} />
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

const systemLimit = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupSystemLimitEditor} />
    <Route path={`${props.match.path}/:systemLimitUid`} component={LookupSystemLimitDetail} />
    <Route path={`${props.match.path}`} component={LookupSystemLimitList} />
  </Switch>
);

export const LookupRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/roles`} component={role} />
      <Route path={`${props.match.path}/mileageexception`} component={mileageException} />
      <Route path={`${props.match.path}/systemlimits`} component={systemLimit} />
    </Layout>
  </Switch>
);