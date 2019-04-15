import AppMenu from '@constants/AppMenu';
import { SecureMenuRoute } from '@layout/components/SecureMenuRoute';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { TravelRequestDetail } from './request/detail/TravelRequestDetail';
// import RequestEditor from './request/editor/RequestEditor';
import { TravelRequestForm } from './request/form/TravelRequestForm';
import { TravelRequestList } from './request/list/TravelRequestList';
import { TravelRequestApprovalDetail } from './requestApproval/detail/TravelRequestApprovalDetail';
import { TravelApprovalList } from './requestApproval/list/TravelApprovalList';
import { TravelSettlementDetails } from './settlement/detail/TravelSettlementDetails';
import { TravelSettlementForm } from './settlement/form/TravelSettlementForm';
import { TravelSettlementList } from './settlement/list/TravelSettlementList';
import { TravelSettlementApprovalDetails } from './settlementApproval/detail/TravelSettlementApprovalDetails';
import { TravelSettlementApprovalList } from './settlementApproval/list/TravelSettlementApprovalList';

const request = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={TravelRequestForm} />
    <Route path={`${props.match.path}/:travelUid`} component={TravelRequestDetail} />
    <Route path={`${props.match.path}`} component={TravelRequestList} />
  </Switch>
);

const settlement = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/form`} component={TravelSettlementForm} />
    <Route path={`${props.match.path}/:travelSettlementUid`} component={TravelSettlementDetails} />
    <Route path={`${props.match.path}`} component={TravelSettlementList} />
  </Switch>
);

const approvalRequest = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:travelUid`} component={TravelRequestApprovalDetail} />
    <Route path={`${props.match.path}`} component={TravelApprovalList} />
  </Switch>
);

const approvalSettlement = (props: RouteComponentProps) => (
  <Switch>
    <Route path={`${props.match.path}/:travelSettlementUid`} component={TravelSettlementApprovalDetails} />
    <Route path={`${props.match.path}`} component={TravelSettlementApprovalList} />
  </Switch>
);

export const TravelRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <SecureMenuRoute 
      path={`${props.match.path}/requests`}
      menu={AppMenu.Travel} 
      subMenu={AppMenu.TravelRequest} 
      component={request} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/approvals`}
      menu={AppMenu.Travel} 
      subMenu={AppMenu.TravelApproval} 
      component={approvalRequest} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/settlement/requests`}
      menu={AppMenu.Travel} 
      subMenu={AppMenu.TravelSettlementRequest} 
      component={settlement} 
    />
    <SecureMenuRoute 
      path={`${props.match.path}/settlement/approvals`}
      menu={AppMenu.Travel} 
      subMenu={AppMenu.TravelSettlementApproval} 
      component={approvalSettlement} 
    />
  </Switch>
);