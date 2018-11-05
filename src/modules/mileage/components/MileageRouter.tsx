import { MileageApprovalDetail } from '@mileage/components/approval/detail/MileageApprovalDetail';
import { MileageApprovalList } from '@mileage/components/approval/list/MileageApprovalList';
import { MileageRequestDetail } from '@mileage/components/request/detail/MileageRequestDetail';
import MileageRequestEditor from '@mileage/components/request/editor/MileageRequestEditor';
import { MileageRequestList } from '@mileage/components/request/list/MileageRequestList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

type AllProps = RouteComponentProps;

const listComponent = () => (
  <MileageRequestList orderBy="uid" direction="descending" />
);

const detailComponent = () => <MileageRequestDetail />;

const editorComponent = () => <MileageRequestEditor />;

const listApproval = () => (
  <MileageApprovalList orderBy="uid" direction="descending" />
);

const detailApproval = () => <MileageApprovalDetail />;

export const MileageRequestRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route
      exact
      path={`${props.match.path}/request/`}
      component={listComponent}
    />
    <Route
      path={`${props.match.path}/request/details/:mileageUid`}
      component={detailComponent}
    />
    <Route path={`${props.match.path}/form`} component={editorComponent} />
  </Switch>
);

export const MileageApprovalRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route exact path={`${props.match.path}/`} component={listApproval} />
    <Route
      path={`${props.match.path}/details/:mileageUid`}
      component={detailApproval}
    />
  </Switch>
);
