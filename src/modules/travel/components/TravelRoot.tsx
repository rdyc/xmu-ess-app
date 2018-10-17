import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import TravelRequestDetail from './request/TravelRequestDetail';
import TravelRequestList from './request/TravelRequestList';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const TravelRoot: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/request`} component={TravelRequestList}/>
    <Route path={`${props.match.path}/details/:travelUid`} component={TravelRequestDetail} />
  </Switch>
);