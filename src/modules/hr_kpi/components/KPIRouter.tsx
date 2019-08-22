import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { KPICategoryDetail } from './category/Detail/KPICategoryDetail';
import { KPICategoryForm } from './category/form/KPICategoryForm';
import { KPICategoryList } from './category/list/KPICategoryList';
import { KPIEmployeeDetail } from './employee/detail/KPIEmployeeDetail';
import { EmployeeList } from './employee/list/employee/EmployeeList';
import { KPIEmployeeList } from './employee/list/kpi/KPIEmployeeList';
import { KPIHRInputDetail } from './hr/detail/KPIHRInputDetail';
import { EmployeeHRInputList } from './hr/list/employee/EmployeeHRInputList';
import { KPIHRInputList } from './hr/list/kpi/KPIHRInputList';
import { KPIManagerInputDetail } from './manager/detail/KPIManagerInputDetail';
import { EmployeeManagerInputList } from './manager/list/employee/EmployeeManagerInputList';
import { KPIManagerInputList } from './manager/list/kpi/KPIManagerInputList';
import { KPITemplateDetail } from './template/detail/KPITemplateDetail';
import { KPITemplateForm } from './template/form/KPITemplateForm';
import { KPITemplateList } from './template/list/KPITemplateList';

const employee = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:employeeUid/:kpiUid`} component={KPIEmployeeDetail} />
    <Route path={`${props.match.path}/:employeeUid`} component={KPIEmployeeList} />
    <Route path={`${props.match.path}`} component={EmployeeList} />
  </Switch>
);

const hrInput = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:employeeUid/:kpiUid`} component={KPIHRInputDetail} />
    <Route path={`${props.match.path}/:employeeUid`} component={KPIHRInputList} />
    <Route path={`${props.match.path}`} component={EmployeeHRInputList} />
  </Switch>
);

const managerInput = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:employeeUid/:kpiUid`} component={KPIManagerInputDetail} />
    <Route path={`${props.match.path}/:employeeUid`} component={KPIManagerInputList} />
    <Route path={`${props.match.path}`} component={EmployeeManagerInputList} />
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
    <SecureMenuRoute 
      path={`${props.match.path}/managerinputs`}
      menu={AppMenu.HumanResource} 
      subMenu={AppMenu.ManagerKPIInput} 
      component={managerInput} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/hrinputs`}
      menu={AppMenu.HumanResource} 
      subMenu={AppMenu.HRKPIInput} 
      component={hrInput} 
    />
  </Switch>
);