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
import { WebJobRecurringForm } from './recurring/form/WebJobRecurringForm';
import { WebJobRecurringList } from './recurring/list/WebJobRecurringList';
import { WebJobServerList } from './servers/list/WebJobServerList';
import { WebJobMonitoringTab } from './tabs/WebJobMonitoringTab';

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
    <Route path={`${props.match.path}/form`} component={WebJobRecurringForm} />
    <Route path={`${props.match.path}/:recurringUid`} component={WebJobRecurringDetail} />
    <Route path={`${props.match.path}`} component={WebJobRecurringList} />
  </Switch>
);

const webJob = (props: RouteComponentProps) => (
  <WebJobMonitoringTab>
    <Switch>
      <Route path={`${props.match.path}/monitoring`} component={monitoring} />
      <Route path={`${props.match.path}/definitions`} component={definitions} />
      <Route path={`${props.match.path}/recurrings`} component={recurrings} />
      <Route path={`${props.match.path}/servers`} component={servers} />
      <Route path={`${props.match.path}`} component={WebJobMonitoringList} />
    </Switch>
  </WebJobMonitoringTab>
);

export const WebJobRouter: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}`}
      menu={AppMenu.WebJob}
      subMenu={AppMenu.WebJob} 
      component={webJob} 
    />
  </Switch>
);