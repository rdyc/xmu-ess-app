import { Layout } from '@layout/components/base';
import { MileageExceptionList } from '@lookup/components/mileageException/list/LookupMileageExceptionListView';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { LookupCustomerList } from './customer/list/LookupCustomerList';
import { MileageExceptionDetail } from './mileageException/detail/MileageExceptionDetail';

const mileageException = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:mileageExceptionUid`} component={MileageExceptionDetail} />
    <Route path={`${props.match.path}`} component={MileageExceptionList} />
   </Switch>
);

const lookupCustomer = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={LookupCustomerList} />
   </Switch>
);

export const LookupRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/mileageexception`} component={mileageException} />
      <Route path={`${props.match.path}/customer`} component={lookupCustomer} />
    </Layout>
  </Switch>
);