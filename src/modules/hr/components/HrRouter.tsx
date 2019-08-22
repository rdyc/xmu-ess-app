import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { CompetencyAssessmentForm } from './competency/form/assessment/CompetencyAssessmentForm';
import { CompetencyResponderForm } from './competency/form/responder/CompetencyResponderForm';

const assessment = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={CompetencyAssessmentForm} />
    {/* <Route path={`${props.match.path}`} component={} /> */}
  </Switch>
);

const responder = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={CompetencyResponderForm} />
    {/* <Route path={`${props.match.path}`} component={} /> */}
  </Switch>
);

export const HrRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/competencyassessment`}
      menu={AppMenu.HumanResource} 
      subMenu={AppMenu.CompetencyAssessment} 
      component={assessment} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/competencyemployee`}
      menu={AppMenu.HumanResource} 
      subMenu={AppMenu.CompetencyEmployee} 
      component={responder} 
    />
  </Switch>
);