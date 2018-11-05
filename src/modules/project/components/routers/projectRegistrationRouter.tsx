import { ProjectRegistrationDetail } from '@project/components/registration/detail/ProjectRegistrationDetail';
import RegistrationEditor from '@project/components/registration/editor/ProjectRegistrationEditor';
import { ProjectRegistrationList } from '@project/components/registration/list/ProjectRegistrationList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { OwnerEditor } from '../owner/editor/OwnerEditor';
import { SiteEditor } from '../sites/SiteEditor';
import { StatusEditor } from '../status/StatusEditor';

type AllProps 
  = RouteComponentProps;

const registrationListComponent = () => <ProjectRegistrationList orderBy="uid" direction="descending"/>;
const registrationDetailComponent = () => <ProjectRegistrationDetail/>;
const registrationEditorComponent = () => <RegistrationEditor/>;
const ownerEditorComponent = () => <OwnerEditor/>;
const statusEditorComponent = () => <StatusEditor/>;
const siteEditorComponent = () => <SiteEditor/>;

export const projectRegistrationRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={registrationListComponent} />
    <Route path={`${props.match.path}/details/:projectUid`} component={registrationDetailComponent} />
    <Route path={`${props.match.path}/form`} component={registrationEditorComponent} />
    <Route path={`${props.match.path}/owner`} component={ownerEditorComponent} />
    <Route path={`${props.match.path}/status`} component={statusEditorComponent} />
    <Route path={`${props.match.path}/sites/:companyUid/:projectUid`} component={siteEditorComponent} />
  </Switch>
);