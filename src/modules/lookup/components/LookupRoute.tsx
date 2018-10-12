import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { PositionDetailContainer, PositionFormContainer, PositionListContainer } from '@lookup/components/position';
import { WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const LookupRoute: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/position/list/`} component={PositionListContainer} />
    <Route path={`${props.match.path}/position/details/:positionUid`} component={PositionDetailContainer} />
    <Route path={`${props.match.path}/position/form`} component={PositionFormContainer} />
  </Switch>
);