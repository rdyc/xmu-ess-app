import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { RequestDetail } from './request/detail/RequestDetail';
import RequestEditor from './request/editor/RequestEditor';
import { TravelRequestList } from './request/list/TravelRequestList';
import { TravelApprovalDetail } from './requestApproval/detail/TravelApprovalDetail';
import { TravelApprovalList } from './requestApproval/list/TravelApprovalList';
import { TravelSettlementDetail } from './settlement/detail/TravelSettlementDetail';
import TravelSettlementEditor from './settlement/editor/TravelSettlementEditor';
import { TravelSettlementRequestList } from './settlement/list/TravelSettlementRequestList';
import { TravelSettlementApprovalDetail } from './settlementApproval/detail/TravelSettlementApprovalDetail';
import { TravelSettlementListApproval } from './settlementApproval/list/TravelSettlementListApproval';

const request = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={RequestEditor} />
    <Route path={`${props.match.path}/:travelUid`} component={RequestDetail} />
    <Route path={`${props.match.path}`} component={TravelRequestList} />
  </Switch>
);

const settlement = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={TravelSettlementEditor} />
    <Route path={`${props.match.path}/:travelSettlementUid`} component={TravelSettlementDetail} />
    <Route path={`${props.match.path}`} component={TravelSettlementRequestList} />
  </Switch>
);

const approvalRequest = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:travelUid`} component={TravelApprovalDetail} />
    <Route path={`${props.match.path}`} component={TravelApprovalList} />
  </Switch>
);

const approvalSettlement = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:travelSettlementUid`} component={TravelSettlementApprovalDetail} />
    <Route path={`${props.match.path}`} component={TravelSettlementListApproval} />
  </Switch>
);

export const TravelRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/requests`} component={request} />
      <Route path={`${props.match.path}/approvals/request`} component={approvalRequest} />
      <Route path={`${props.match.path}/settlements`} component={settlement} />
      <Route path={`${props.match.path}/approvals/settlement`} component={approvalSettlement} />
    </Layout>
  </Switch>
);