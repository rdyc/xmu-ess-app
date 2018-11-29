import { Layout } from '@layout/components/base';
import { CurrencyDetail } from '@lookup/components/currency/detail/CurrencyDetail';
import { CurrencyEditor } from '@lookup/components/currency/editor/CurrencyEditor';
import { CurrencyList } from '@lookup/components/currency/list/CurrencyList';
import { LookupHolidayDetail } from '@lookup/components/holiday/detail/LookupHolidayDetail';
import { LookupHolidayList } from '@lookup/components/holiday/list/LookupHolidayList';
import { LookupLeaveDetail } from '@lookup/components/leave/detail/LookupLeaveDetail';
import { LookupLeaveList } from '@lookup/components/leave/list/LookupLeaveList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { LookupCompanyDetail } from './company/detail/LookupCompanyDetail';
import LookupCompanyEditor from './company/editor/LookupCompanyEditor';
import { LookupCompanyList } from './company/list/LookupCompanyList';
import LookupHolidayEditor from './holiday/editor/LookupHolidayEditor';
import LookupLeaveEditor from './leave/editor/LookupLeaveEditor';
import { MileageExceptionDetail } from './mileageException/detail/MileageExceptionDetail';
import { MileageExceptionList } from './mileageException/list/LookupMileageExceptionListView';

const company = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/list`} component={LookupCompanyList} />
    <Route path={`${props.match.path}/form`} component={LookupCompanyEditor} />
    <Route path={`${props.match.path}/:companyUid`} component={LookupCompanyDetail} />
  </Switch>
);

const currency = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={CurrencyEditor} />
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

const holiday = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupHolidayEditor} />
    <Route path={`${props.match.path}/:holidayUid`} component={LookupHolidayDetail} />
    <Route path={`${props.match.path}`} component={LookupHolidayList} />
   </Switch>
);

const leave = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupLeaveEditor} />
    <Route path={`${props.match.path}/:leaveUid`} component={LookupLeaveDetail} />
    <Route path={`${props.match.path}`} component={LookupLeaveList} />
   </Switch>
);

export const LookupRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/company`} component={company} />
      <Route path={`${props.match.path}/mileageexception`} component={mileageException} />
      <Route path={`${props.match.path}/currency`} component={currency} />
      <Route path={`${props.match.path}/holiday`} component={holiday} />
      <Route path={`${props.match.path}/leave`} component={leave} />
    </Layout>
  </Switch>
);