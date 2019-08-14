import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { KPICategoryDetail } from './category/Detail/KPICategoryDetail';
import { KPICategoryForm } from './category/form/KPICategoryForm';
import { KPICategoryList } from './category/list/KPICategoryList';
import { EmployeeKPIDetail } from './employee/detail/EmployeeKPIDetail';
import { EmployeeList } from './employee/list/employee/EmployeeList';
import { EmployeeKPIList } from './employee/list/kpi/EmployeeKPIList';
import { KPITemplateDetail } from './template/detail/KPITemplateDetail';
import { KPITemplateForm } from './template/form/KPITemplateForm';
import { KPITemplateList } from './template/list/KPITemplateList';

const employee = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:employeeUid/:kpiUid`} component={EmployeeKPIDetail} />
    {/* <Route path={`${props.match.path}/:employeeUid/form`} component={KPITemplateForm} /> */}
    <Route path={`${props.match.path}/:employeeUid`} component={EmployeeKPIList} />
    <Route path={`${props.match.path}`} component={EmployeeList} />
  </Switch>
);

const template = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={KPITemplateForm} />
    <Route path={`${props.match.path}/:templateUid`} component={KPITemplateDetail} />
    <Route path={`${props.match.path}`} component={KPITemplateList} />
  </Switch>
);

const category = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={KPICategoryForm} /> 
    <Route path={`${props.match.path}/:categoryUid`} component={KPICategoryDetail} />
    <Route path={`${props.match.path}`} component={KPICategoryList} />
  </Switch>
);

export const KPIRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/templates`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.KPITemplate} 
      component={template} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/categories`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.KPITemplate} 
      component={category} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/employees`}
      menu={AppMenu.HumanResource} 
      subMenu={AppMenu.EmployeeKPI} 
      component={employee} 
    />
  </Switch>
);