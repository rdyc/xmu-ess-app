import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { NotifPeriodDetail } from './period/detail/NotifPeriodDetail';
import { NotifPeriodForm } from './period/form/NotifPeriodForm';
import { NotifPeriodList } from './period/list/NotifPeriodList';
import { NotifSettingDetail } from './setting/detail/NotifSettingDetail';
import { NotifSettingForm } from './setting/form/NotifSettingForm';
import { NotifSettingList } from './setting/list/NotifSettingList';
import { NotifTemplateDetail } from './template/detail/NotifTemplateDetail';
import { NotifTemplateForm } from './template/form/NotifTemplateForm';
import { NotifTemplateList } from './template/list/NotifTemplateList';

const period = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={NotifPeriodForm} />
    <Route path={`${props.match.path}/:periodUid`} component={NotifPeriodDetail} /> 
    <Route path={`${props.match.path}`} component={NotifPeriodList} />
  </Switch>
);

const setting = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={NotifSettingForm} /> 
    <Route path={`${props.match.path}/:settingUid`} component={NotifSettingDetail} />
    <Route path={`${props.match.path}`} component={NotifSettingList} />
  </Switch>
);

const template = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={NotifTemplateForm} /> 
    <Route path={`${props.match.path}/:templateUid`} component={NotifTemplateDetail} />
    <Route path={`${props.match.path}`} component={NotifTemplateList} />
  </Switch>
);

export const HRNotifRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/notification/periods`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.HRNotifPeriod} 
      component={period} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/notification/settings`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.HRNotifSetting} 
      component={setting} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/notification/templates`}
      menu={AppMenu.Lookup} 
      subMenu={AppMenu.HRNotifTemplate} 
      component={template} 
    />
  </Switch>
);