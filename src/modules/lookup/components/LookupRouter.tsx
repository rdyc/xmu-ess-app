import { Layout } from '@layout/components/base';
import { MileageExceptionList } from '@lookup/components/mileageException/list/LookupMileageExceptionListView';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { LookupHolidayDetail } from './holiday/detail/LookupHolidayDetail';
import { LookupHolidayList } from './holiday/list/LookupHolidayList';
import { LookupLeaveDetail } from './leave/detail/LookupLeaveDetail';
import { LookupLeaveList } from './leave/list/LookupLeaveList';
import { MileageExceptionDetail } from './mileageException/detail/MileageExceptionDetail';

const mileageException = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:mileageExceptionUid`} component={MileageExceptionDetail} />
    <Route path={`${props.match.path}`} component={MileageExceptionList} />
   </Switch>
);

const holiday = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:holidayUid`} component={LookupHolidayDetail} />
    <Route path={`${props.match.path}`} component={LookupHolidayList} />
   </Switch>
);

const leave = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:leaveUid`} component={LookupLeaveDetail} />
    <Route path={`${props.match.path}`} component={LookupLeaveList} />
   </Switch>
);

export const LookupRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/mileageexception`} component={mileageException} />
      <Route path={`${props.match.path}/holiday`} component={holiday} />
      <Route path={`${props.match.path}/leave`} component={leave} />
    </Layout>
  </Switch>
);