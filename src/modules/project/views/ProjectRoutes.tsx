import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { WithStyles } from '@material-ui/core';
import ProjectDetailView from '@project/views/detail/ProjectDetailView';
import ProjectListView from '@project/views/list/ProjectListView';
import ProjectRegisterView from '@project/views/new/ProjectRegisterView';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const projectRoutes: React.StatelessComponent<AllProps> = props => (
  <Switch>
    <Route path={props.match.path + '/list/'} component={ProjectListView} />
    <Route path={props.match.path + '/detail/:projectUid'} component={ProjectDetailView} />
    <Route path={props.match.path + '/register'} component={ProjectRegisterView } />
  </Switch>
);