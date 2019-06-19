import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { HRTemplateDetail } from './template/detail/HRTemplateDetail';
import { HRTemplateList } from './template/list/HRTemplateList';
// import { HRMeasurementList } from './measurement/list/HRMeasurementList';

const template = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}/form`} component={} /> */}
    <Route path={`${props.match.path}/:templateUid`} component={HRTemplateDetail} />
    <Route path={`${props.match.path}`} component={HRTemplateList} />
  </Switch>
);

export const HrRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/templates`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.LookupEmployee} 
      component={template} 
    />
  </Switch>
);