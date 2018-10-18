import { RegistrationDetail } from '@project/components/registration/detail/RegistrationDetail';
import RegistrationEditor from '@project/components/registration/editor/RegistrationEditor';
import { RegistrationList } from '@project/components/registration/list/RegistrationList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

type AllProps 
  = RouteComponentProps;

const listComponent = () => (
  <RegistrationList orderBy="uid" direction="descending"/>
);

const detailComponent = () => (
  <RegistrationDetail/>
);

const editorComponent = () => (
  <RegistrationEditor/>
);

export const projectRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={listComponent} />
    <Route path={`${props.match.path}/details/:projectUid`} component={detailComponent} />
    {/* <Route path={`${props.match.path}/sites/:projectUid`} component={ProjectSiteContainer} /> */}
    <Route path={`${props.match.path}/form`} component={editorComponent} />
  </Switch>
);