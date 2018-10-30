import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { TravelApprovalDetail } from '../requestApproval/detail/TravelApprovalDetail';
import { RequestApprovalList } from '../requestApproval/list/RequestApprovalList';

type AllProps = RouteComponentProps;

const approvalListComponent = () => (
  <RequestApprovalList />
);

const approvalDetailComponent = () => <TravelApprovalDetail/>;

export const travelApprovalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/request`} component={approvalListComponent} />
    <Route path={`${props.match.path}/details/:travelUid`} component={approvalDetailComponent} />    
  </Switch>
);