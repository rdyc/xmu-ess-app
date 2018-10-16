import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { LeaveDetailContainer, LeaveFormContainer, LeaveListContainer } from '@lookup/components/leave';
import { WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const LeaveRoot: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={LeaveListContainer} />
    <Route path={`${props.match.path}/details/:leaveUid`} component={LeaveDetailContainer} />
    <Route path={`${props.match.path}/form`} component={LeaveFormContainer} />
  </Switch>
);