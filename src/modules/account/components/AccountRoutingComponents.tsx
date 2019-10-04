import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { MyCompetencyDetail } from '@profile/components/detail/competency/MyCompetencyDetail';
import { MyKPIFinalDetail } from '@profile/components/detail/kpi/detail/MyKPIFinalDetail';
import { MyKPIFinalList } from '@profile/components/detail/kpi/list/MyKPIFinalList';
import { MyKPIAssignDetail } from '@profile/components/detail/kpiAssign/detail/MyKPIAssignDetail';
import { MyKPIAssignList } from '@profile/components/detail/kpiAssign/list/MyKPIAssignList';
import { MyProfileDetail } from '@profile/components/detail/profile/MyProfileDetail';
import { AccountAccess } from './access';
import { AccountEmployeeAccessDetail } from './detail/access/AccountEmployeeAccessDetail';
import { AccountEmployeeAccessHistoryDetail } from './detail/accessHistory/AccountEmployeeAccessHistoryDetail';
import { AccountEmployeeDetail } from './detail/common/AccountEmployeeDetail';
import { AccountEmployeeEducationDetail } from './detail/education/AccountEmployeeEducationDetail';
import { AccountEmployeeExperienceDetail } from './detail/experience/AccountEmployeeExperienceDetail';
import { AccountEmployeeFamilyDetail } from './detail/family/AccountEmployeeFamilyDetail';
import { AccountEmployeeNoteDetail } from './detail/note/AccountEmployeeNoteDetail';
import { AccountEmployeeRateDetail } from './detail/rate/AccountEmployeeRateDetail';
import { AccountEmployeeTrainingDetail } from './detail/training/AccountEmployeeTrainingDetail';
import { AccessForm } from './form/access/AccessForm';
import { EmployeeForm } from './form/common/EmployeeForm';
import { EducationForm } from './form/education/EducationForm';
import { ExperienceForm } from './form/experience/ExperienceForm';
import { FamilyForm } from './form/family/FamilyForm';
import { NoteForm } from './form/note/NoteForm';
import { RateForm } from './form/rate/RateForm';
import { TrainingForm } from './form/training/TrainingForm';
import { AccountEmployeeAccessList } from './list/access/AccountEmployeeAccessList';
import { AccountEmployeeAccessHistoryList } from './list/accessHistory/AccountEmployeeAccessHistoryList';
import { AccountEmployeeList } from './list/common/AccountEmployeeList';
import { AccountEmployeeEducationList } from './list/education/AccountEmployeeEducationList';
import { AccountEmployeeExperienceList } from './list/experience/AccountEmployeeExperienceList';
import { AccountEmployeeFamilyList } from './list/family/AccountEmployeeFamilyList';
import { AccountEmployeeNoteList } from './list/note/AccountEmployeeNoteList';
import { AccountEmployeeTrainingList } from './list/training/AccountEmployeeTrainingList';
import { AccountProfile } from './profile';

const access = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={AccountAccess} />
  </Switch>
);

const profile = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/kpiassign/:kpiAssignUid`} component={MyKPIAssignDetail} />
    <Route path={`${props.match.path}/kpi/:kpiUid`} component={MyKPIFinalDetail} />
    <Route path={`${props.match.path}/kpiassign`} component={MyKPIAssignList} />
    <Route path={`${props.match.path}/kpi`} component={MyKPIFinalList} />
    <Route path={`${props.match.path}/competency`} component={MyCompetencyDetail} />
    <Route path={`${props.match.path}/detail`} component={MyProfileDetail} />
    <Route path={`${props.match.path}`} component={AccountProfile} />
  </Switch>
);

const employee = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={EmployeeForm} />
    <Route path={`${props.match.path}/:employeeUid/history`} component={employeeHistory} />
    <Route path={`${props.match.path}/:employeeUid/education`} component={employeeEducation} />
    <Route path={`${props.match.path}/:employeeUid/family`} component={employeeFamily} />
    <Route path={`${props.match.path}/:employeeUid/experience`} component={employeeExperience} />
    <Route path={`${props.match.path}/:employeeUid/training`} component={employeeTraining} />
    <Route path={`${props.match.path}/:employeeUid/access`} component={employeeMultiAccess} />
    <Route path={`${props.match.path}/:employeeUid/rate`} component={employeeRate} />
    <Route path={`${props.match.path}/:employeeUid/note`} component={employeeNote} />
    <Route path={`${props.match.path}/:employeeUid`} component={AccountEmployeeDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeList} />
  </Switch>
);

const employeeEducation = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={EducationForm} />    
    <Route path={`${props.match.path}/:educationUid`} component={AccountEmployeeEducationDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeEducationList} />
  </Switch>
);

const employeeHistory = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:historyUid`} component={AccountEmployeeAccessHistoryDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeAccessHistoryList} />
  </Switch>
);

const employeeFamily = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={FamilyForm} />    
    <Route path={`${props.match.path}/:familyUid`} component={AccountEmployeeFamilyDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeFamilyList} />
  </Switch>
);

const employeeExperience = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={ExperienceForm} />
    <Route path={`${props.match.path}/:experienceUid`} component={AccountEmployeeExperienceDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeExperienceList} />    
  </Switch>
);

const employeeTraining = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={TrainingForm} />
    <Route path={`${props.match.path}/:trainingUid`} component={AccountEmployeeTrainingDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeTrainingList} />
  </Switch>
);

const employeeMultiAccess = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={AccessForm} />    
    <Route path={`${props.match.path}/:accessUid`} component={AccountEmployeeAccessDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeAccessList} />
  </Switch>
);

const employeeRate = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={RateForm} />    
    <Route path={`${props.match.path}/:rateUid`} component={AccountEmployeeRateDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeRateDetail} />
  </Switch>
);

const employeeNote = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={NoteForm} />
    <Route path={`${props.match.path}/:noteId`} component={AccountEmployeeNoteDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeNoteList} />
  </Switch>
);

export const AccountRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/access`} component={access} />
    <Route path={`${props.match.path}/profile`} component={profile} />
    <SecureMenuRoute 
      path={`${props.match.path}/employee`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupEmployee} 
      component={employee} 
    />
  </Switch>
);