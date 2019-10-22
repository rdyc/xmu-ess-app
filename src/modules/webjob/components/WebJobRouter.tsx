import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { WebJobMonitoringDetail } from './monitoring/detail/WebJobMonitoringDetail';
import { WebJobMonitoringList } from './monitoring/list/WebJobMonitoringList';

const monitoring = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:jobId`} component={WebJobMonitoringDetail} />
    <Route path={`${props.match.path}`} component={WebJobMonitoringList} />
  </Switch>
);

export const WebJobRouter: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/monitoring/jobs`}
      menu={AppMenu.WebJob} 
      subMenu={AppMenu.WebJobMonitoring} 
      component={monitoring} 
    />
  </Switch>
);