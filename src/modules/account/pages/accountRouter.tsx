import AccountProfilePage from '@account/pages/accountProfilePage';
import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const accountRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}'/profile`} component={AccountProfilePage} />
    {/* <Route path={props.match.path + '/switch'} component={AccountSwitchPage} /> */}
  </Switch>
);