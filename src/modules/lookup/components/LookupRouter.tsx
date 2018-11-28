import { Layout } from '@layout/components/base';
import { MileageExceptionList } from '@lookup/components/mileageException/list/LookupMileageExceptionListView';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { MileageExceptionDetail } from './mileageException/detail/MileageExceptionDetail';
import MileageExceptionEditor from './mileageException/editor/MileageExceptionEditor';

const mileageException = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={MileageExceptionEditor} />
    <Route path={`${props.match.path}/:mileageExceptionUid`} component={MileageExceptionDetail} />
    <Route path={`${props.match.path}`} component={MileageExceptionList} />
   </Switch>
);

export const LookupRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/mileageexception`} component={mileageException} />
    </Layout>
  </Switch>
);