import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { HrCompetencyAssessmentDetail } from './competency/detail/assessment/HrCompetencyAssessmentDetail';
import { CompetencyAssessmentForm } from './competency/form/assessment/CompetencyAssessmentForm';
import { CompetencyEmployeeForm } from './competency/form/employee/CompetencyEmployeeForm';
import { HrCompetencyAssessmentList } from './competency/list/assessment/HrCompetencyAssessmentList';
import { HrCompetencyEmployeeList } from './competency/list/employee/HrCompetencyEmployeeList';

const assessment = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={CompetencyAssessmentForm} />
    <Route path={`${props.match.path}/:assessmentUid`} component={HrCompetencyAssessmentDetail} />
    <Route path={`${props.match.path}`} component={HrCompetencyAssessmentList} />
  </Switch>
);

const employee = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={CompetencyEmployeeForm} />
    <Route path={`${props.match.path}`} component={HrCompetencyEmployeeList} />
  </Switch>
);

export const HrRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/assessment`}
      menu={AppMenu.HumanResource} 
      subMenu={AppMenu.CompetencyAssessment} 
      component={assessment} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/assessmentinput`}
      menu={AppMenu.HumanResource} 
      subMenu={AppMenu.CompetencyAssessmentInput} 
      component={employee} 
    />
  </Switch>
);