// import { ConnectedReduxProps } from '@generic/types';
// import { IAppUser } from '@layout/interfaces';
// import { WithStyles } from '@material-ui/core';
// import styles from '@styles';
// import TimesheetDetail from '@timesheet/components/request/TimesheetDetail';
// // import ProjectRegistrationDetail from '@project/components/registration/ProjectRegistrationDetail';
// // import ProjectRegistrationEditor from '@project/components/registration/ProjectRegistrationEditor';
// import TimesheetList from '@timesheet/components/request/TimesheetList';
// import * as React from 'react';
// import { Route, RouteComponentProps, Switch } from 'react-router';
// import TimesheetEditor from './request/TimesheetEditor';

// interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
//   user: IAppUser;
// }

// type AllProps = PropsFromState & ConnectedReduxProps;

// export const TimesheetRoot: React.SFC<AllProps> = props => (
//   <Switch>
//     <Route path={`${props.match.path}/entry/history`} component={TimesheetList} />
//     <Route path={`${props.match.path}/details/:timesheetUid`} component={TimesheetDetail} />
//     {/* <Route path={`${props.match.path}/sites/:projectUid`} component={ProjectSiteContainer} /> */}
//     <Route path={`${props.match.path}/form`} component={TimesheetEditor} />
//   </Switch>
// );