import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { WebJobMonitoringList } from './monitoring/list/WebJobMonitoringList';

const monitoring = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}/form`} component={CompetencyAssessmentForm} />
    <Route path={`${props.match.path}/:assessmentUid`} component={HrCompetencyAssessmentDetail} /> */}
    <Route path={`${props.match.path}/:type`} component={WebJobMonitoringList} />
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
  </Switch>
);