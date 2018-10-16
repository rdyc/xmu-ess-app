import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import LeaveRequestDetailContainer from '@leave/components/request/LeaveRequestDetailContainer';
import LeaveRequestListContainer from '@leave/components/request/LeaveRequestListContainer';
// import LeaveRequestFormContainer from '@leave/components/request//LeaveRequestFormContainer';
import { WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const leaveRequestRoutes: React.StatelessComponent<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={LeaveRequestListContainer} />
    <Route path={`${props.match.path}/details/:leaveUid`} component={LeaveRequestDetailContainer} />
    {/* <Route path={`${props.match.path}/form`} component={LeaveRequestFormContainer } /> */}
  </Switch>
);