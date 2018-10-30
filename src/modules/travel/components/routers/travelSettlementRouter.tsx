import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { TravelSettlementDetail } from '../settlement/detail/TravelSettlementDetail';
import { TravelSettlementList } from '../settlement/list/TravelSettlementList';

type AllProps = RouteComponentProps;

const SettlementlistComponent = () => (
  <TravelSettlementList orderBy="uid" direction="descending"/>
);

const settlementDetailComponent = () => (
  <TravelSettlementDetail/>
);

export const travelSettlementRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/request`} component={SettlementlistComponent} />
    <Route path={`${props.match.path}/details/:travelSettlementUid`} component={settlementDetailComponent} />
  </Switch>
);