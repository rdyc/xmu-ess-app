import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { CurrencyDetailContainer, CurrencyListContainer } from '@lookup/components/currency';
import { SystemLimitListContainer } from '@lookup/components/systemLimit';
import { WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const currencyRoutes: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={CurrencyListContainer} />
    <Route path={`${props.match.path}/details/:currencyUid`} component={CurrencyDetailContainer} />
  </Switch>
);
export const systemLimitRoutes: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={SystemLimitListContainer} />
  </Switch>
);