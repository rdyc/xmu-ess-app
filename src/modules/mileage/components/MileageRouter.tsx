import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import { MileageRequestList } from '@mileage/components//request/list/MileageRequestList';
import { MileageApprovalDetail } from '@mileage/components/approval/detail/MileageApprovalDetail';
import { MileageApprovalList } from '@mileage/components/approval/list/MileageApprovalList';
import { MileageRequestDetail } from '@mileage/components/request/detail/MileageRequestDetail';
// import MileageRequestEditor from '@mileage/components/request/editor/MileageRequestEditor';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { MileageForm } from './request/form/MileageForm';

const request = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={MileageForm} />
    <Route path={`${props.match.path}/:mileageUid`} component={MileageRequestDetail} />
    <Route path={`${props.match.path}`} component={MileageRequestList} />
  </Switch>
);

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:mileageUid`} component={MileageApprovalDetail} />
    <Route path={`${props.match.path}`} component={MileageApprovalList} />
  </Switch>
);

export const MileageRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/requests`}
      menu={AppMenu.Mileage} 
      subMenu={AppMenu.MileageRequest} 
      component={request} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/approvals`}
      menu={AppMenu.Mileage} 
      subMenu={AppMenu.MileageApproval} 
      component={approval} 
    />
  </Switch>
);