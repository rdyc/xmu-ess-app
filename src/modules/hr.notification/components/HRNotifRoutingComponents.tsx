import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { NotifPeriodDetail } from './period/detail/NotifPeriodDetail';
import { NotifPeriodForm } from './period/form/NotifPeriodForm';
import { NotifPeriodList } from './period/list/NotifPeriodList';

const period = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={NotifPeriodForm} />
    <Route path={`${props.match.path}/:periodUid`} component={NotifPeriodDetail} /> 
    <Route path={`${props.match.path}`} component={NotifPeriodList} />
  </Switch>
);

export const HRNotifRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/notification/periods`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupCompany} 
      component={period} 
    />
  </Switch>
);