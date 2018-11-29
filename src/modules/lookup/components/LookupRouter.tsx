import { Layout } from '@layout/components/base';
import { MileageExceptionList } from '@lookup/components/mileageException/list/LookupMileageExceptionListView';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { MileageExceptionDetail } from './mileageException/detail/MileageExceptionDetail';
import MileageExceptionEditor from './mileageException/editor/MileageExceptionEditor';
import { LookupSystemLimitDetail } from './systemLimit/detail/LookupSystemLimitDetail';
import LookupSystemLimitEditor from './systemLimit/editor/LookupSystemLimitEditor';
import { LookupSystemLimitListView } from './systemLimit/list/LookupSystemLimitListView';

const mileageException = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={MileageExceptionEditor} />
    <Route path={`${props.match.path}/:mileageExceptionUid`} component={MileageExceptionDetail} />
    <Route path={`${props.match.path}`} component={MileageExceptionList} />
   </Switch>
);

const systemLimit = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupSystemLimitEditor}/>
    <Route path={`${props.match.path}/:systemLimitUid`} component={LookupSystemLimitDetail} />
    <Route path={`${props.match.path}`} component={LookupSystemLimitListView}/>
  </Switch>
);

export const LookupRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/mileageexceptions`} component={mileageException} />
      <Route path={`${props.match.path}/systemlimits`} component={systemLimit} />
    </Layout>
  </Switch>
);