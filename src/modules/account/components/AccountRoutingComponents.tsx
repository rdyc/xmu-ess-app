import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { AccountAccess } from './access';
import { AccountEmployeeAccessDetail } from './detail/access/AccountEmployeeAccessDetail';
import { AccountEmployeeAccessHistoryDetail } from './detail/accessHistory/AccountEmployeeAccessHistoryDetail';
import { AccountEmployeeDetail } from './detail/common/AccountEmployeeDetail';
import { AccountEmployeeEducationDetail } from './detail/education/AccountEmployeeEducationDetail';
import { AccountEmployeeExperienceDetail } from './detail/experience/AccountEmployeeExperienceDetail';
import { AccountEmployeeFamilyDetail } from './detail/family/AccountEmployeeFamilyDetail';
import { InformationDetail } from './detail/information/detail/InformationDetail';
import { InformationKpi } from './detail/information/kpi/InformationKpi';
import { InformationPosition } from './detail/information/position/InformationPosition';
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
import { AccountEmployeeRateList } from './list/rate/AccountEmployeeRateList';
import { AccountEmployeeTrainingList } from './list/training/AccountEmployeeTrainingList';
import { AccountProfile } from './profile';

const access = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={AccountAccess} />
  </Switch>
);

const profile = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={AccountProfile} />
  </Switch>
);

const information = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/position`} component={InformationPosition} />
    <Route path={`${props.match.path}/kpi`} component={InformationKpi} />
    <Route path={`${props.match.path}`} component={InformationDetail} />
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
    <Route path={`${props.match.path}`} component={AccountEmployeeRateList} />
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
    <SecureMenuRoute 
      path={`${props.match.path}/information`}
      menu={AppMenu.Account} 
      subMenu={AppMenu.AccountInformation} 
      component={information} 
    />
  </Switch>
);