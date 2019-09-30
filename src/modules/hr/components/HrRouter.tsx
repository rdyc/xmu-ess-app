import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { HrCompetencyAssessmentDetail } from './competency/detail/assessment/HrCompetencyAssessmentDetail';
import { HrCompetencyEmployeeDetail } from './competency/detail/employee/HrCompetencyEmployeeDetail';
import { HrCompetencyResultDetail } from './competency/detail/result/HrCompetencyResultDetail';
import { CompetencyAssessmentForm } from './competency/form/assessment/CompetencyAssessmentForm';
import { CompetencyEmployeeForm } from './competency/form/employee/CompetencyEmployeeForm';
import { CompetencyResultForm } from './competency/form/result/CompetencyResultForm';
import { HrCompetencyAssessmentList } from './competency/list/assessment/HrCompetencyAssessmentList';
import { HrCompetencyEmployeeList } from './competency/list/employee/HrCompetencyEmployeeList';
import { HrCompetencyResultList } from './competency/list/result/HrCompetencyResultList';
import { HrCornerPageDetail } from './corner/detail/page/HrCornerPageDetail';
import { HrCornerPageForm } from './corner/form/page/HrCornerPageForm';
import { HrCornerPageList } from './corner/list/page/HrCornerPageList';

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
    <Route path={`${props.match.path}/:competencyEmployeeUid`} component={HrCompetencyEmployeeDetail} />
    <Route path={`${props.match.path}`} component={HrCompetencyEmployeeList} />
  </Switch>
);

const result = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={CompetencyResultForm} />
    <Route path={`${props.match.path}/:competencyEmployeeUid`} component={HrCompetencyResultDetail} />
    <Route path={`${props.match.path}`} component={HrCompetencyResultList} />
  </Switch>
);

const corner = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/page`} component={page} />
  </Switch>
);

const page = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={HrCornerPageForm} />
    <Route path={`${props.match.path}/:pageUid`} component={HrCornerPageDetail} />
    <Route path={`${props.match.path}`} component={HrCornerPageList} />
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
    <SecureMenuRoute 
      path={`${props.match.path}/assessmentresult`}
      menu={AppMenu.HumanResource} 
      subMenu={AppMenu.CompetencyAssessmentResult} 
      component={result} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/corner`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.HRCorner} 
      component={corner} 
    />
  </Switch>
);