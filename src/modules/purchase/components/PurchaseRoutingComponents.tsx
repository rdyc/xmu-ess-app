import { Layout } from '@layout/components/base';
import { PurchaseApprovalDetail } from '@purchase/components/purchaseApproval/detail/PurchaseApprovalDetail';
import { PurchaseApprovalList } from '@purchase/components/purchaseApproval/list/PurchaseApprovalList';
import { PurchaseRequestDetail } from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetail';
import { PurchaseRequestEditor } from '@purchase/components/purchaseRequest/editor/PurchaseRequestEditor';
import { PurchaseRequestList } from '@purchase/components/purchaseRequest/list/PurchaseRequestList';
import { PurchaseSettlementDetail } from '@purchase/components/purchaseSettlement/detail/PurchaseSettlementDetail';
import { PurchaseSettlementEditor } from '@purchase/components/purchaseSettlement/editor/PurchaseSettlementEditor';
import { PurchaseSettlementList } from '@purchase/components/purchaseSettlement/list/PurchaseSettlementList';
import { SettlementApprovalDetail } from '@purchase/components/settlementApproval/detail/SettlementApprovalDetail';
import { SettlementApprovalList } from '@purchase/components/settlementApproval/list/SettlementApprovalList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

const request = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={PurchaseRequestEditor} />
    <Route path={`${props.match.path}/:purchaseUid`} component={PurchaseRequestDetail} />
    <Route path={`${props.match.path}`} component={PurchaseRequestList} />
  </Switch>
);

const approval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:purchaseUid`} component={PurchaseApprovalDetail} />
    <Route path={`${props.match.path}`} component={PurchaseApprovalList} />
  </Switch>
);

const settlementRequest = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={PurchaseSettlementEditor} />
    <Route path={`${props.match.path}/:purchaseUid`} component={PurchaseSettlementDetail} />    
    <Route path={`${props.match.path}`} component={PurchaseSettlementList} />
  </Switch>
);

const settlementApproval = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:purchaseUid`} component={SettlementApprovalDetail} />
    <Route path={`${props.match.path}`} component={SettlementApprovalList} />
  </Switch>
);

export const PurchaseRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/requests`} component={request} />
      <Route path={`${props.match.path}/approvals`} component={approval} />
      <Route path={`${props.match.path}/settlement/requests`} component={settlementRequest} />
      <Route path={`${props.match.path}/settlement/approvals`} component={settlementApproval} />
    </Layout>
  </Switch>
);