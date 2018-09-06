import * as React from 'react';
import { WithStyles } from '@material-ui/core';
import { ConnectedReduxProps } from '../../../../sample/store';
import AccountProfilePage from './accountProfilePage';
import { RouteComponentProps, Route, Switch } from 'react-router';
import styles from '../../../styles';
import { AppUser } from '../../../store/@layout';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: AppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const accountRouter: React.StatelessComponent<AllProps> = props => (
  <Switch>
    <Route path={props.match.path + '/profile'} component={AccountProfilePage} />
    {/* <Route path={props.match.path + '/switch'} component={AccountSwitchPage} /> */}
  </Switch>
);