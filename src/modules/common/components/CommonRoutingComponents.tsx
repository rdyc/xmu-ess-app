import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { CommonDetail } from './detail/CommonDetail';
import { CommonForm } from './form/CommonForm';
import { CommonList } from './list/CommonList';
import { CommonSummary } from './summary/CommonSummary';

const CommonSystem = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:category/form`} component={CommonForm} />
    <Route path={`${props.match.path}/:category/:id`} component={CommonDetail} />
    <Route path={`${props.match.path}/:category`} component={CommonList} />
    <Route path={`${props.match.path}`} component={CommonSummary} />
  </Switch>
);

export const CommonRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/system`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.Common} 
      component={CommonSystem} 
    />
  </Switch>
);