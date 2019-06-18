import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { HRMeasurementList } from './measurement/list/HRMeasurementList';

const template = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={HRMeasurementList} />    
  </Switch>
);

export const HrRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/measurement`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupEmployee} 
      component={template} 
    />
  </Switch>
);