import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { AccountAccess } from './access';
import { AccountEmployeeAccess } from './detail/access/AccountEmployeeAccess';
import { AccountEmployeeAccessHistory } from './detail/accessHistory/AccountEmployeeAccessHistory';
import { AccountEmployeeDetail } from './detail/AccountEmployeeDetail';
import { AccountEmployeeEducationDetail } from './detail/education/AccountEmployeeEducationDetail';
import { AccountEmployeeExperience } from './detail/experience/AccountEmployeeExperience';
import { AccountEmployeeFamily } from './detail/family/AccountEmployeeFamily';
import { AccountEmployeeNote } from './detail/note/AccountEmployeeNote';
import { AccountEmployeeRate } from './detail/rate/AccountEmployeeRate';
import { AccountEmployeeTrainingDetail } from './detail/training/AccountEmployeeTrainingDetail';
// import { AccountEmployeeTraining } from './detail/training/AccountEmployeeTraining';
import AccountEmployeeAccessEditor from './editor/AccountEmployeeAccessEditor';
import { AccountEmployeeEditor } from './editor/AccountEmployeeEditor';
import { AccountEmployeeEducationEditor } from './editor/AccountEmployeeEducationEditor';
import AccountEmployeeNoteEditor from './editor/AccountEmployeeNoteEditor';
import { AccountEmployeeList } from './list/AccountEmployeeList';
import { AccountEmployeeEducationList } from './list/education/AccountEmployeeEducationList';
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
    <Route path={`${props.match.path}/:employeeUid/rate`} component={AccountEmployeeRate} />
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
    <Route path={`${props.match.path}`} component={AccountEmployeeAccessHistory} />
  </Switch>
);

const employeeFamily = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={AccountEmployeeFamily} />
  </Switch>
);

const employeeExperience = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={AccountEmployeeExperience} />
  </Switch>
);

const employeeTraining = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}`} component={AccountEmployeeTraining} /> */}
    {/* <Route path={`${props.match.path}/form`} component={AccountEmployeeTrainingEditor} /> */}
    <Route path={`${props.match.path}/:trainingUid`} component={AccountEmployeeTrainingDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeTrainingList} />
  </Switch>
);

const employeeMultiAccess = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={AccountEmployeeAccessEditor} />
    <Route path={`${props.match.path}`} component={AccountEmployeeAccess} />
  </Switch>
);

const employeeNote = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={AccountEmployeeNoteEditor} />
    <Route path={`${props.match.path}`} component={AccountEmployeeNote} />
  </Switch>
);

export const AccountRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/access`} component={access} />
    <Route path={`${props.match.path}/profile`} component={profile} />
    <Route path={`${props.match.path}/employee`} component={employee} />
  </Switch>
);