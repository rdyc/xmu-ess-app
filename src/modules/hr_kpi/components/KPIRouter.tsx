import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { KPIAssignDetail } from './assign/detail/KPIAssignDetail';
import { EmployeeAssignList } from './assign/list/employee/EmployeeAssignList';
import { KPIAssignList } from './assign/list/kpi/KPIAssignList';
import { KPICategoryDetail } from './category/Detail/KPICategoryDetail';
import { KPICategoryForm } from './category/form/KPICategoryForm';
import { KPICategoryList } from './category/list/KPICategoryList';
import { KPIEmployeeDetail } from './employee/detail/KPIEmployeeDetail';
import { EmployeeList } from './employee/list/employee/EmployeeList';
import { KPIEmployeeList } from './employee/list/kpi/KPIEmployeeList';
import { KPITemplateDetail } from './template/detail/KPITemplateDetail';
import { KPITemplateForm } from './template/form/KPITemplateForm';
import { KPITemplateList } from './template/list/KPITemplateList';

const final = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:employeeUid/:kpiUid`} component={KPIEmployeeDetail} />
    <Route path={`${props.match.path}/:employeeUid`} component={KPIEmployeeList} />
    <Route path={`${props.match.path}`} component={EmployeeList} />
  </Switch>
);

const approval = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}/:employeeUid/form`} component={KPIHRInputForm} />
    <Route path={`${props.match.path}/:employeeUid/:kpiUid`} component={KPIHRInputDetail} />
    <Route path={`${props.match.path}/form`} component={KPIHRInputBulkForm} />
    <Route path={`${props.match.path}/:employeeUid`} component={KPIHRInputList} />
    <Route path={`${props.match.path}`} component={EmployeeHRInputList} /> */}
  </Switch>
);

const employee = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}/:employeeUid/form`} component={KPIManagerInputForm} />
    <Route path={`${props.match.path}/:employeeUid/:kpiUid`} component={KPIManagerInputDetail} />
    <Route path={`${props.match.path}/:employeeUid`} component={KPIManagerInputList} />
    <Route path={`${props.match.path}`} component={EmployeeManagerInputList} /> */}
  </Switch>
);

const assign = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}/:employeeUid/form`} component={KPIManagerInputForm} /> */}
    <Route path={`${props.match.path}/:employeeUid/:kpiAssignUid`} component={KPIAssignDetail} />
    <Route path={`${props.match.path}/:employeeUid`} component={KPIAssignList} />
    <Route path={`${props.match.path}`} component={EmployeeAssignList} />
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
      path={`${props.match.path}/assigns`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.HRKPIAssign} 
      component={assign} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/finals`}
      menu={AppMenu.HumanResource} 
      subMenu={AppMenu.EmployeeKPI} 
      component={final} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/employees`}
      menu={AppMenu.HumanResource} 
      subMenu={AppMenu.ManagerKPIInput} 
      component={employee} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/approvals`}
      menu={AppMenu.HumanResource} 
      subMenu={AppMenu.HRKPIInput} 
      component={approval} 
    />
  </Switch>
);