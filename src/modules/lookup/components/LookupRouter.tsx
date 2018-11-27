import { Layout } from '@layout/components/base';
import { CurrencyDetail } from '@lookup/components/currency/detail/CurrencyDetail';
import { CurrencyList } from '@lookup/components/currency/list/CurrencyList';
import { MileageExceptionList } from '@lookup/components/mileageException/list/LookupMileageExceptionListView';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { MileageExceptionDetail } from './mileageException/detail/MileageExceptionDetail';

const currency = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:currencyUid`} component={CurrencyDetail} />
    <Route path={`${props.match.path}`} component={CurrencyList} />
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
      <Route path={`${props.match.path}/mileageexception`} component={mileageException} />
      <Route path={`${props.match.path}/currency`} component={currency} />
    </Layout>
  </Switch>
);