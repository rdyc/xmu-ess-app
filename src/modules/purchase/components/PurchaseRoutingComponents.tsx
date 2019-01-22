import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
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
    <SecureMenuRoute 
      path={`${props.match.path}/requests`}
      menu={AppMenu.Purchase} 
      subMenu={AppMenu.PurchaseRequest} 
      component={request} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/approvals`}
      menu={AppMenu.Purchase} 
      subMenu={AppMenu.PurchaseApproval} 
      component={approval} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/settlement/requests`}
      menu={AppMenu.Purchase} 
      subMenu={AppMenu.PurchaseSettlementRequest} 
      component={settlementRequest} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/settlement/approvals`}
      menu={AppMenu.Purchase} 
      subMenu={AppMenu.PurchaseSettlementApproval} 
      component={settlementApproval} 
    />
  </Switch>
);