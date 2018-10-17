import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import LeaveRequestDetail from '@leave/components/request/LeaveRequestDetail';
import LeaveRequestEditor from '@leave/components/request/LeaveRequestEditor';
import LeaveRequestList from '@leave/components/request/LeaveRequestList';
import { WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const LeaveRequestRoot: React.StatelessComponent<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={LeaveRequestList} />
    <Route path={`${props.match.path}/details/:leaveRequestUid`} component={LeaveRequestDetail} />
    <Route path={`${props.match.path}/form`} component={LeaveRequestEditor } />
  </Switch>
);