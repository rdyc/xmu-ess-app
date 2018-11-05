import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { TravelSettlementApprovalDetail } from '../settlementApproval/detail/TravelSettlementApprovalDetail';
import { TravelSettlementApprovalList } from '../settlementApproval/list/TravelSettlementApprovalList';

type AllProps = RouteComponentProps;

const settlementApprovalListComponent = () => (
  <TravelSettlementApprovalList orderBy="uid" direction="descending" />
);

const settlementApprovalDetailComponent = () => (
  <TravelSettlementApprovalDetail />
);

export const travelSettlementApprovalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/request`} component={settlementApprovalListComponent} />
    <Route path={`${props.match.path}/details/:travelSettlementUid`} component={settlementApprovalDetailComponent} />    
  </Switch>
);