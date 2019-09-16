import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { KPIApprovalDetail } from './approval/detail/KPIApprovalDetail';
import { KPIApprovalList } from './approval/list/KPIApprovalList';
import { KPIAssignDetail } from './assign/detail/KPIAssignDetail';
import { KPIAssignBulkForm } from './assign/form/createbulk/KPIAssignBulkForm';
import { KPIAssignForm } from './assign/form/edit/KPIAssignForm';
import { EmployeeAssignList } from './assign/list/employee/EmployeeAssignList';
import { KPIAssignList } from './assign/list/kpi/KPIAssignList';
import { KPICategoryDetail } from './category/Detail/KPICategoryDetail';
import { KPICategoryForm } from './category/form/KPICategoryForm';
import { KPICategoryList } from './category/list/KPICategoryList';
import { KPIEmployeeDetail } from './employee/detail/KPIEmployeeDetail';
import { KPIEmployeeForm } from './employee/form/KPIEmployeeForm';
import { KPIEmployeeList } from './employee/list/KPIEmployeeList';
import { KPITemplateDetail } from './template/detail/KPITemplateDetail';
import { KPITemplateForm } from './template/form/KPITemplateForm';
import { KPITemplateList } from './template/list/KPITemplateList';

const final = () => (
  <Switch>
    {/* <Route path={`${props.match.path}/:employeeUid/:kpiUid`} component={KPIEmployeeDetail} />
    <Route path={`${props.match.path}/:employeeUid`} component={KPIEmployeeList} />
    <Route path={`${props.match.path}`} component={EmployeeList} /> */}
  </Switch>
);

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:kpiUid`} component={KPIApprovalDetail} />
    <Route path={`${props.match.path}`} component={KPIApprovalList} />
  </Switch>
);

const employee = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={KPIEmployeeForm} />
    <Route path={`${props.match.path}/:kpiUid`} component={KPIEmployeeDetail} />
    <Route path={`${props.match.path}`} component={KPIEmployeeList} />
  </Switch>
);

const assign = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:employeeUid/form`} component={KPIAssignForm} />
    <Route path={`${props.match.path}/:employeeUid/:kpiAssignUid`} component={KPIAssignDetail} />
    <Route path={`${props.match.path}/form`} component={KPIAssignBulkForm} />
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