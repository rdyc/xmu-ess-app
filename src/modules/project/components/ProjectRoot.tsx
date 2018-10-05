import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { WithStyles } from '@material-ui/core';
import { ProjectDetailContainer, ProjectFormContainer, ProjectListContainer } from '@project/components/project';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const ProjectRoot: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={ProjectListContainer} />
    <Route path={`${props.match.path}/details/:projectUid`} component={ProjectDetailContainer} />
    {/* <Route path={`${props.match.path}/sites/:projectUid`} component={ProjectSiteContainer} /> */}
    <Route path={`${props.match.path}/form`} component={ProjectFormContainer} />
  </Switch>
);