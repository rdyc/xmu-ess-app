import { WithStyles } from '@material-ui/core';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { ConnectedReduxProps } from '../../../generic/types';
import styles from '../../../styles';
import { IAppUser } from '../../@layout/interfaces';
import AccountProfilePage from './accountProfilePage';

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