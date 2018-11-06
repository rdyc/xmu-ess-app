import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
// import { LeaveCancellationDetail } from '../cancellation/detail/LeaveCancellationDetail';
import { LeaveCancellationList } from '../cancellation/list/LeaveCancellationList';

type AllProps = RouteComponentProps;

const cancellationListComponent = () => <LeaveCancellationList  orderBy="uid" direction="descending"/>;
// const cancellationDetailComponent = () => <LeaveCancellationDetail/>;

export const leaveCancellationRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route exact path={`${props.match.path}`} component={cancellationListComponent} />
    {/* <Route path={`${props.match.path}/details/:leaveUid`} component={cancellationDetailComponent} /> */}
  </Switch>
);