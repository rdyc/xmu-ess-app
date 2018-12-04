import { Layout } from '@layout/components/base';
import { CurrencyDetail } from '@lookup/components/currency/detail/CurrencyDetail';
import { CurrencyEditor } from '@lookup/components/currency/editor/CurrencyEditor';
import { CurrencyList } from '@lookup/components/currency/list/CurrencyList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { LookupCompanyDetail } from './company/detail/LookupCompanyDetail';
import LookupCompanyEditor from './company/editor/LookupCompanyEditor';
import { LookupCompanyList } from './company/list/LookupCompanyList';
import { LookupDiemDetail } from './diem/detail/LookupDiemDetail';
import LookupDiemEditor from './diem/editor/LookupDiemEditor';
import { LookupDiemList } from './diem/list/LookupDiemList';
import { MileageExceptionDetail } from './mileageException/detail/MileageExceptionDetail';
import MileageExceptionEditor from './mileageException/editor/MileageExceptionEditor';
import { MileageExceptionList } from './mileageException/list/LookupMileageExceptionListView';
import { LookupSystemLimitDetail } from './systemLimit/detail/LookupSystemLimitDetail';
import LookupSystemLimitEditor from './systemLimit/editor/LookupSystemLimitEditor';
// import { LookupSystemLimitListView } from './systemLimit/list/LookupSystemLimitListView';
import LookupSystemLimitList from './systemLimit/list/LookupSystemLimitList';

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
    <Route path={`${props.match.path}/form`} component={MileageExceptionEditor} />
    <Route path={`${props.match.path}/:mileageExceptionUid`} component={MileageExceptionDetail} />
    <Route path={`${props.match.path}`} component={MileageExceptionList} />
  </Switch>
);

const systemLimit = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupSystemLimitEditor}/>
    <Route path={`${props.match.path}/:systemLimitUid`} component={LookupSystemLimitDetail} />
    <Route path={`${props.match.path}`} component={LookupSystemLimitList}/>
  </Switch>
);

const diem = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={LookupDiemEditor} />
    <Route path={`${props.match.path}/list`} component={LookupDiemList} />
    <Route path={`${props.match.path}/:diemUid`} component={LookupDiemDetail} />
  </Switch>
);

export const LookupRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/company`} component={company} />
      <Route path={`${props.match.path}/systemlimits`} component={systemLimit} />
      <Route path={`${props.match.path}/mileageexceptions`} component={mileageException} />
      <Route path={`${props.match.path}/currency`} component={currency} />
      <Route path={`${props.match.path}/diemvalue`} component={diem} />
    </Layout>
  </Switch>
);