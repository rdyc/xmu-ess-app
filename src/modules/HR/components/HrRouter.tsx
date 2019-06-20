import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { HRMeasurementDetail } from './measurement/Detail/HRMeasurementDetail';
import { HRMeasurementList } from './measurement/list/HRMeasurementList';
import { HRTemplateDetail } from './template/detail/HRTemplateDetail';
import { HRTemplateForm } from './template/form/HRTemplateForm';
import { HRTemplateList } from './template/list/HRTemplateList';

const template = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={HRTemplateForm} />
    <Route path={`${props.match.path}/:templateUid`} component={HRTemplateDetail} />
    <Route path={`${props.match.path}`} component={HRTemplateList} />
  </Switch>
);

const measurement = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}/form`} component={} /> */}
    <Route path={`${props.match.path}/:measurementUid`} component={HRMeasurementDetail} />
    <Route path={`${props.match.path}`} component={HRMeasurementList} />
  </Switch>
);

export const HrRoutingComponents: React.SFC<RouteComponentProps> = props => (
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