import { RegistrationDetail } from '@project/components/registration/detail/RegistrationDetail';
import RegistrationEditor from '@project/components/registration/editor/RegistrationEditor';
import { RegistrationList } from '@project/components/registration/list/RegistrationList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { OwnerEditor } from './owner/editor/OwnerEditor';

type AllProps 
  = RouteComponentProps;

const registrationListComponent = () => <RegistrationList orderBy="uid" direction="descending"/>;
const registrationDetailComponent = () => <RegistrationDetail/>;
const registrationEditorComponent = () => <RegistrationEditor/>;
const ownerEditorComponent = () => <OwnerEditor/>;

export const projectRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={registrationListComponent} />
    <Route path={`${props.match.path}/details/:projectUid`} component={registrationDetailComponent} />
    <Route path={`${props.match.path}/form`} component={registrationEditorComponent} />
    <Route path={`${props.match.path}/owner`} component={ownerEditorComponent} />
  </Switch>
);