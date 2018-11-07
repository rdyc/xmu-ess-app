import { AccountAccess } from '@account/components/access';
import { AccountProfile } from '@account/components/profile';
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
    <Route path={`${props.match.path}'/profile`} component={AccountProfile} />
    <Route path={`${props.match.path}'/access`} component={AccountAccess} />
  </Switch>
);