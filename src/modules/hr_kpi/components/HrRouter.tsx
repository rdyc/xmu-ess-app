import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { KPIMeasurementDetail } from './measurement/Detail/KPIMeasurementDetail';
import { KPImeasurementForm } from './measurement/form/KPIMeasurementForm';
import { KPIMeasurementList } from './measurement/list/KPIMeasurementList';
import { KPITemplateDetail } from './template/detail/KPITemplateDetail';
import { KPITemplateForm } from './template/form/KPITemplateForm';
import { KPITemplateList } from './template/list/KPITemplateList';

const template = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={KPITemplateForm} />
    <Route path={`${props.match.path}/:templateUid`} component={KPITemplateDetail} />
    <Route path={`${props.match.path}`} component={KPITemplateList} />
  </Switch>
);

const measurement = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={KPImeasurementForm} /> 
    <Route path={`${props.match.path}/:measurementUid`} component={KPIMeasurementDetail} />
    <Route path={`${props.match.path}`} component={KPIMeasurementList} />
  </Switch>
);

export const KPIRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/templates`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupEmployee} 
      component={template} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/measurement`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupEmployee} 
      component={measurement} 
    />
  </Switch>
);