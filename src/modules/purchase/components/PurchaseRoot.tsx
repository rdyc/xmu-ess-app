import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { WithStyles } from '@material-ui/core';
import ProjectRegistrationDetail from '@project/components/registration/ProjectRegistrationDetail';
import ProjectRegistrationEditor from '@project/components/registration/ProjectRegistrationEditor';
import ProjectRegistrationList from '@project/components/registration/ProjectRegistrationList';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const ProjectRoot: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={ProjectRegistrationList} />
    <Route path={`${props.match.path}/details/:projectUid`} component={ProjectRegistrationDetail} />
    {/* <Route path={`${props.match.path}/sites/:projectUid`} component={ProjectSiteContainer} /> */}
    <Route path={`${props.match.path}/form`} component={ProjectRegistrationEditor} />
  </Switch>
);