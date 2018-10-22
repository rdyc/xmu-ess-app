import { PurchaseRequestDetail } from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetail';
// import PurchaseRequestEditor from '@purchase/components/purchaseRequest/editor/PurchaseRequestEditor';
import { PurchaseRequestList } from '@purchase/components/purchaseRequest/list/PurchaseRequestList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

type AllProps
  = RouteComponentProps;

const listComponent = () => (
  <PurchaseRequestList orderBy="uid" direction="descending" />
);

const detailComponent = () => (
  <PurchaseRequestDetail />
);

// const editorComponent = () => (
//   <PurchaseRequestEditor />
// );

export const purchaseRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/request`} component={listComponent} />
    <Route path={`${props.match.path}/request/details/:purchaseUid`} component={detailComponent} />
    {/* <Route path={`${props.match.path}/form`} component={editorComponent} /> */}
  </Switch>
);