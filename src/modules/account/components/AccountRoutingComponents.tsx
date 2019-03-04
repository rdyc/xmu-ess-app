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
import { AccountEmployeeNoteDetail } from './detail/note/AccountEmployeeNoteDetail';
import { AccountEmployeeRateDetail } from './detail/rate/AccountEmployeeRateDetail';
import { AccountEmployeeTrainingDetail } from './detail/training/AccountEmployeeTrainingDetail';
import { AccountEmployeeAccessEditor } from './editor/access/AccountEmployeeAccessEditor';
import { AccountEmployeeEditor } from './editor/common/AccountEmployeeEditor';
import { AccountEmployeeEducationEditor } from './editor/education/AccountEmployeeEducationEditor';
import { AccountEmployeeExperienceEditor } from './editor/experience/AccountEmployeeExperienceEditor';
import { AccountEmployeeFamilyEditor } from './editor/family/AccountEmployeeFamilyEditor';
import { AccountEmployeeNoteEditor } from './editor/note/AccountEmployeeNoteEditor';
import { AccountEmployeeRateEditor } from './editor/rate/AccountEmployeeRateEditor';
import { AccountEmployeeTrainingEditor } from './editor/training/AccountEmployeeTrainingEditor';
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

const employee = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={AccountEmployeeEditor} />
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
    <Route path={`${props.match.path}/form`} component={AccountEmployeeEducationEditor} />    
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
    <Route path={`${props.match.path}/form`} component={AccountEmployeeFamilyEditor} />    
    <Route path={`${props.match.path}/:familyUid`} component={AccountEmployeeFamilyDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeFamilyList} />
  </Switch>
);

const employeeExperience = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={AccountEmployeeExperienceEditor} />
    <Route path={`${props.match.path}/:experienceUid`} component={AccountEmployeeExperienceDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeExperienceList} />    
  </Switch>
);

const employeeTraining = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={AccountEmployeeTrainingEditor} />
    <Route path={`${props.match.path}/:trainingUid`} component={AccountEmployeeTrainingDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeTrainingList} />
  </Switch>
);

const employeeMultiAccess = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={AccountEmployeeAccessEditor} />    
    <Route path={`${props.match.path}/:accessUid`} component={AccountEmployeeAccessDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeAccessList} />
  </Switch>
);

const employeeRate = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={AccountEmployeeRateEditor} />    
    <Route path={`${props.match.path}/:rateUid`} component={AccountEmployeeRateDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeRateList} />
  </Switch>
);

const employeeNote = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={AccountEmployeeNoteEditor} />
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