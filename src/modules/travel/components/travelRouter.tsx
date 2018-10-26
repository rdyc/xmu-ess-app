import { RequestDetail } from '@travel/components/request/detail/RequestDetail';
import RequestEditor from '@travel/components/request/editor/RequestEditor';
import { RequestList } from '@travel/components/request/list/RequestList';
import { RequestApprovalList } from '@travel/components/requestApproval/list/RequestApprovalList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { TravelSettlementDetail } from './settlement/detail/TravelSettlementDetail';
import { TravelSettlementList } from './settlement/list/TravelSettlementList';

type AllProps 
  = RouteComponentProps;

const listComponent = () => (
  <RequestList orderBy="uid" direction="descending"/>
);

const detailComponent = () => (
  <RequestDetail/>
);

const editorComponent = () => (
  <RequestEditor/>
);

const approvalListComponent = () => (
  <RequestApprovalList />
);

const SettlementlistComponent = () => (
  <TravelSettlementList orderBy="uid" direction="descending"/>
);

const settlementDetailComponent = () => (
  <TravelSettlementDetail/>
);

export const travelRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/request`} component={listComponent} />
    <Route path={`${props.match.path}/details/:travelUid`} component={detailComponent} />
    <Route path={`${props.match.path}/form`} component={editorComponent} />
  </Switch>
);

export const travelSettlementRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/request`} component={SettlementlistComponent} />
    <Route path={`${props.match.path}/details/:travelSettlementUid`} component={settlementDetailComponent} />
  </Switch>
);

export const travelApprovalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/request`} component={approvalListComponent} />    
  </Switch>
);