import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { CurrencyDetailContainer, CurrencyListContainer } from '@lookup/components/currency';
import { SystemLimitDetailContainer, SystemLimitListContainer } from '@lookup/components/systemLimit';
import { WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const lookupRoutes: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/currency/list/`} component={CurrencyListContainer} />
    <Route path={`${props.match.path}/currency/details/:currencyUid`} component={CurrencyDetailContainer} />
    <Route path={`${props.match.path}/systemlimit/list/`} component={SystemLimitListContainer} />
    <Route path={`${props.match.path}/systemlimit/details/:companyUid/:systemLimitUid`} component={SystemLimitDetailContainer} />
  </Switch>
);