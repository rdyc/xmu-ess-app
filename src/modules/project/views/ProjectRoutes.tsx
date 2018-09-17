import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { WithStyles } from '@material-ui/core';
import ProjectListView from '@project/views/ProjectListView';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const projectRoutes: React.StatelessComponent<AllProps> = props => (
  <Switch>
    <Route path={props.match.path + '/registration'} component={ProjectListView} />
  </Switch>
);