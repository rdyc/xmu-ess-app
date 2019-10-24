import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { WebJobDefinitionDetail } from './definition/detail/WebJobDefinitionDetail';
import { WebJobDefinitionForm } from './definition/form/WebJobDefinitionForm';
import { WebJobDefinitionList } from './definition/list/WebJobDefinitionList';
import { WebJobMonitoringDetail } from './monitoring/detail/WebJobMonitoringDetail';
import { WebJobMonitoringList } from './monitoring/list/WebJobMonitoringList';
import { WebJobRecurringDetail } from './recurring/detail/WebJobRecurringDetail';
import { WebJobRecurringList } from './recurring/list/WebJobRecurringList';
import { WebJobServerList } from './servers/list/WebJobServerList';

const monitoring = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:type/:jobId`} component={WebJobMonitoringDetail} />
    <Route path={`${props.match.path}/:type`} component={WebJobMonitoringList} />
    <Route path={`${props.match.path}`} component={WebJobMonitoringList} />
  </Switch>
);

const definitions = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={WebJobDefinitionForm} />
    <Route path={`${props.match.path}/:definitionUid`} component={WebJobDefinitionDetail} />
    <Route path={`${props.match.path}`} component={WebJobDefinitionList} />
  </Switch>
);

const servers = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={WebJobServerList} />
  </Switch>
);

const recurrings = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}/form`} component={WebJobMonitoringList} /> */}
    <Route path={`${props.match.path}/:recurringUid`} component={WebJobRecurringDetail} />
    <Route path={`${props.match.path}`} component={WebJobRecurringList} />
  </Switch>
);

export const WebJobRouter: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/monitoring`}
      menu={AppMenu.WebJob} 
      subMenu={AppMenu.WebJobMonitoring} 
      component={monitoring} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/definitions`}
      menu={AppMenu.WebJob} 
      subMenu={AppMenu.WebJobDefinition} 
      component={definitions} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/recurrings`}
      menu={AppMenu.WebJob} 
      subMenu={AppMenu.WebJobRecurring} 
      component={recurrings} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/servers`}
      menu={AppMenu.WebJob} 
      subMenu={AppMenu.WebJobMonitoring} 
      component={servers} 
    />
  </Switch>
);