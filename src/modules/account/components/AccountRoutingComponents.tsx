import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { AccountAccess } from './access';
import { AccountEmployeeAccessHistory } from './detail/accessHistory/AccountEmployeeAccessHistory';
import { AccountEmployeeDetail } from './detail/AccountEmployeeDetail';
import { AccountEmployeeEducation } from './detail/education/AccountEmployeeEducation';
import { AccountEmployeeExperience } from './detail/experience/AccountEmployeeExperience';
import { AccountEmployeeFamily } from './detail/family/AccountEmployeeFamily';
import { AccountEmployeeTraining } from './detail/training/AccountEmployeeTraining';
import { Editor } from './editor/Editor';
import { AccountEmployeeList } from './list/AccountEmployeeList';
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
    <Route path={`${props.match.path}/form`} component={Editor} />
    <Route path={`${props.match.path}/:employeeUid/history`} component={employeeHistory} />
    <Route path={`${props.match.path}/:employeeUid/education`} component={employeeEducation} />
    <Route path={`${props.match.path}/:employeeUid/family`} component={employeeFamily} />
    <Route path={`${props.match.path}/:employeeUid/experience`} component={employeeExperience} />
    <Route path={`${props.match.path}/:employeeUid/training`} component={employeeTraining} />
    <Route path={`${props.match.path}/:employeeUid/multiaccess`} component={employeeMultiAccess} />
    <Route path={`${props.match.path}/:employeeUid`} component={AccountEmployeeDetail} />
    <Route path={`${props.match.path}`} component={AccountEmployeeList} />
  </Switch>
);

const employeeEducation = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}`} component={AccountEmployeeEducation} />
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
    <Route path={`${props.match.path}`} component={AccountEmployeeTraining} />
  </Switch>
);

const employeeMultiAccess = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}`} component={AccountEmployeeEducation} /> */}
  </Switch>
);

export const AccountRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/access`} component={access} />
    <Route path={`${props.match.path}/profile`} component={profile} />
    <Route path={`${props.match.path}/employee`} component={employee} />
  </Switch>
);