import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { WithStyles } from '@material-ui/core';
// import MileageRequestDetail from '@mileage/components/request/MileageRequestDetail';
import MileageRequestList from '@mileage/components/request/MileageRequestList';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState
  extends RouteComponentProps<void>,
    WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const MileageRoot: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={MileageRequestList} />
    {/* <Route path={`${props.match.path}/details/:mileageUid`} component={MileageRequestDetail} /> */}
    {/* <Route path={`${props.match.path}/form`} component={} /> */}
  </Switch>
);
