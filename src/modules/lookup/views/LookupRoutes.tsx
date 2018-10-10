import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { WithStyles } from '@material-ui/core';
import CurrencyListView from '@lookup/views/list/CurrencyListView';
import CurrencyDetailView from '@lookup/views/detail/CurrencyDetailView';
import SystemLimitListView from '@lookup/views/list/SystemLimitListView';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const currencyRoutes: React.StatelessComponent<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={CurrencyListView} />
    <Route path={`${props.match.path}/details/`} component={CurrencyDetailView}/>
  </Switch>
);

export const systemLimitRoutes: React.StatelessComponent<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={SystemLimitListView} />
  </Switch>
);