import { PurchaseApprovalDetail } from '@purchase/components/purchaseHistories/detail/PurchaseApprovalDetail';
import { PurchaseApprovalList } from '@purchase/components/purchaseHistories/list/PurchaseApprovalList';
import { PurchaseRequestDetail } from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetail';
import { PurchaseRequestEditor } from '@purchase/components/purchaseRequest/editor/PurchaseRequestEditor';
import { PurchaseRequestList } from '@purchase/components/purchaseRequest/list/PurchaseRequestList';
import { PurchaseSettlementDetail } from '@purchase/components/purchaseSettlement/detail/PurchaseSettlementDetail';
// import PurchaseSettlementEditor from '@purchase/components/purchaseRequest/editor/PurchaseSettlementEditor';
import { PurchaseSettlementList } from '@purchase/components/purchaseSettlement/list/PurchaseSettlementList';
import { SettlementApprovalDetail } from '@purchase/components/settlementHistories/detail/SettlementApprovalDetail';
import { SettlementApprovalList } from '@purchase/components/settlementHistories/list/SettlementApprovalList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

type AllProps
  = RouteComponentProps;

const listComponent = () => (
  <PurchaseRequestList orderBy="uid" direction="descending" />
);

const approvalListComponent = () => (
  <PurchaseApprovalList orderBy="uid" direction="descending" />
);

const detailComponent = () => (
  <PurchaseRequestDetail />
);
const approvalDetailComponent = () => (
  <PurchaseApprovalDetail />
);

const editorComponent = () => (
  <PurchaseRequestEditor />
);

const settlementListComponent = () => (
  <PurchaseSettlementList orderBy="uid" direction="descending" />
);

const settlementapprovalListComponent = () => (
  <SettlementApprovalList orderBy="uid" direction="descending" />
);

const settlementdetailComponent = () => (
  <PurchaseSettlementDetail />
);
const settlementapprovalDetailComponent = () => (
  <SettlementApprovalDetail />
);

// const settlementeditorComponent = () => (
//   <PurchaseSettlementEditor />
// );

export const purchaseRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list`} component={listComponent} />
    <Route path={`${props.match.path}/details/:purchaseUid`} component={detailComponent} />
    <Route path={`${props.match.path}/form`} component={editorComponent} />
  </Switch>
);

export const purchaseApprovalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list`} component={approvalListComponent} />
    <Route path={`${props.match.path}/details/:purchaseUid`} component={approvalDetailComponent} />
  </Switch>
);
export const purchaseSettlementRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list`} component={settlementListComponent} />
    <Route path={`${props.match.path}/details/:purchaseUid`} component={settlementdetailComponent} />    
    {/* <Route path={`${props.match.path}/form`} component={settlementeditorComponent} /> */}
  </Switch>
);

export const purchaseSettlementApprovalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list`} component={settlementapprovalListComponent} />
    <Route path={`${props.match.path}/details/:purchaseUid`} component={settlementapprovalDetailComponent} />
  </Switch>
);