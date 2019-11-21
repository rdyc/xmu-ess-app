import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { HrCompetencyAssessmentDetail } from './competency/detail/assessment/HrCompetencyAssessmentDetail';
import { HrCompetencyCategoryDetail } from './competency/detail/category/HrCompetencyCategoryDetail';
import { HrCompetencyClusterDetail } from './competency/detail/cluster/HrCompetencyClusterDetail';
import { HrCompetencyEmployeeDetail } from './competency/detail/employee/HrCompetencyEmployeeDetail';
import { HrCompetencyMappedDetail } from './competency/detail/mapped/HrCompetencyMappedDetail';
import { HrCompetencyResultDetail } from './competency/detail/result/HrCompetencyResultDetail';
import { CompetencyAssessmentForm } from './competency/form/assessment/CompetencyAssessmentForm';
import { HrCompetencyCategoryForm } from './competency/form/category/HrCompetencyCategoryForm';
import { HrCompetencyClusterForm } from './competency/form/cluster/HrCompetencyClusterForm';
import { CompetencyEmployeeForm } from './competency/form/employee/CompetencyEmployeeForm';
import { HrCompetencyMappedForm } from './competency/form/mapped/HrCompetencyMappedForm';
import { CompetencyResultForm } from './competency/form/result/CompetencyResultForm';
import { EmployeeCompetencyList } from './competency/list/assessment/employeeCompetency/EmployeeCompetencyList';
import { HrCompetencyAssessmentList } from './competency/list/assessment/HrCompetencyAssessmentList';
import { HrCompetencyCategoryList } from './competency/list/category/HrCompetencyCategoryList';
import { HrCompetencyClusterList } from './competency/list/cluster/HrCompetencyClusterList';
import { HrCompetencyEmployeeList } from './competency/list/employee/HrCompetencyEmployeeList';
import { HrCompetencyMappedList } from './competency/list/mapped/HrCompetencyMappedList';
import { HrCompetencyResultList } from './competency/list/result/HrCompetencyResultList';
import { HrCornerPageDetail } from './corner/detail/page/HrCornerPageDetail';
import { HrCornerPageForm } from './corner/form/page/HrCornerPageForm';
import { HrCornerPageList } from './corner/list/page/HrCornerPageList';

const assessment = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:employeeUid/:assessmentUid`} component={HrCompetencyAssessmentDetail} />
    <Route path={`${props.match.path}/form`} component={CompetencyAssessmentForm} />
    <Route path={`${props.match.path}/result`} component={CompetencyResultForm} />
    <Route path={`${props.match.path}/:employeeUid`} component={HrCompetencyAssessmentList} />
    <Route path={`${props.match.path}`} component={EmployeeCompetencyList} />
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

const cluster = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={HrCompetencyClusterForm} />
    <Route path={`${props.match.path}/:clusterUid`} component={HrCompetencyClusterDetail} />
    <Route path={`${props.match.path}`} component={HrCompetencyClusterList} />
  </Switch>
);

const category = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={HrCompetencyCategoryForm} />
    <Route path={`${props.match.path}/:categoryUid`} component={HrCompetencyCategoryDetail} />
    <Route path={`${props.match.path}`} component={HrCompetencyCategoryList} />
  </Switch>
);

const mapped = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={HrCompetencyMappedForm} />
    <Route path={`${props.match.path}/:mappedUid`} component={HrCompetencyMappedDetail} />
    <Route path={`${props.match.path}`} component={HrCompetencyMappedList} />
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
    <SecureMenuRoute 
      path={`${props.match.path}/competency/cluster`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.CompetencyCluster} 
      component={cluster} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/competency/level`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.CompetencyCategory} 
      component={category} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/competency/mapped`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.CompetencyMapped} 
      component={mapped} 
    />
  </Switch>
);