import { Layout } from '@layout/components/base';
import { PurchaseApprovalDetail } from '@purchase/components/purchaseHistories/detail/PurchaseApprovalDetail';
// import { PurchaseApprovalList } from '@purchase/components/purchaseHistories/list/PurchaseApprovalList';
import { PurchaseApprovalCollectionPage } from '@purchase/components/purchaseHistories/list/PurchaseApprovalCollectionPage';
import { PurchaseRequestDetail } from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetail';
import { PurchaseRequestEditor } from '@purchase/components/purchaseRequest/editor/PurchaseRequestEditor';
// import { PurchaseRequestList } from '@purchase/components/purchaseRequest/list/PurchaseRequestList';
import { PurchaseRequestCollectionPage } from '@purchase/components/purchaseRequest/list/PurchaseRequestCollectionPage';
import { PurchaseSettlementDetail } from '@purchase/components/purchaseSettlement/detail/PurchaseSettlementDetail';
import { PurchaseSettlementEditor } from '@purchase/components/purchaseSettlement/editor/PurchaseSettlementEditor';
// import { PurchaseSettlementList } from '@purchase/components/purchaseSettlement/list/PurchaseSettlementList';
import { PurchaseSettlementCollectionPage } from '@purchase/components/purchaseSettlement/list/PurchaseSettlementCollectionPage';
import { SettlementApprovalDetail } from '@purchase/components/settlementHistories/detail/SettlementApprovalDetail';
// import { SettlementApprovalList } from '@purchase/components/settlementHistories/list/SettlementApprovalList';
import { SettlementApprovalCollectionPage } from '@purchase/components/settlementHistories/list/SettlementApprovalCollectionPage';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

const purchase = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}/list`} component={PurchaseRequestList} /> */}
    <Route path={`${props.match.path}/list`} component={PurchaseRequestCollectionPage} />
    <Route path={`${props.match.path}/details/:purchaseUid`} component={PurchaseRequestDetail} />
    <Route path={`${props.match.path}/form`} component={PurchaseRequestEditor} />
  </Switch>
);

const purchaseApproval = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}/list`} component={PurchaseApprovalList} /> */}
    <Route path={`${props.match.path}/list`} component={PurchaseApprovalCollectionPage} />
    <Route path={`${props.match.path}/details/:purchaseUid`} component={PurchaseApprovalDetail} />
  </Switch>
);
const settlement = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}/list`} component={PurchaseSettlementList} /> */}
    <Route path={`${props.match.path}/list`} component={PurchaseSettlementCollectionPage} />
    <Route path={`${props.match.path}/details/:purchaseUid`} component={PurchaseSettlementDetail} />    
    <Route path={`${props.match.path}/form`} component={PurchaseSettlementEditor} />
  </Switch>
);

const settlementApproval = (props: RouteComponentProps) => (
  <Switch>
    {/* <Route path={`${props.match.path}/list`} component={SettlementApprovalList} /> */}
    <Route path={`${props.match.path}/list`} component={SettlementApprovalCollectionPage} />
    <Route path={`${props.match.path}/details/:purchaseUid`} component={SettlementApprovalDetail} />
  </Switch>
);

export const PurchaseRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Layout>
      <Route path={`${props.match.path}/requests`} component={purchase} />
      <Route path={`${props.match.path}/approvals`} component={purchaseApproval} />
      <Route path={`${props.match.path}/settlements`} component={settlement} />
      <Route path={`${props.match.path}/settlementapprovals`} component={settlementApproval} />
    </Layout>
  </Switch>
);