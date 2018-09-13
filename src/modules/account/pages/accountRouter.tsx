import * as React from 'react';
import { WithStyles } from '@material-ui/core';
import AccountProfilePage from './accountProfilePage';
import { RouteComponentProps, Route, Switch } from 'react-router';
import styles from '../../../styles';
import { ConnectedReduxProps } from '../../../generic/types';
import { IAppUser } from '../../@layout/interfaces';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const accountRouter: React.StatelessComponent<AllProps> = props => (
  <Switch>
    <Route path={props.match.path + '/profile'} component={AccountProfilePage} />
    {/* <Route path={props.match.path + '/switch'} component={AccountSwitchPage} /> */}
  </Switch>
);