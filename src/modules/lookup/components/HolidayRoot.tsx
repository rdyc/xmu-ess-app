import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { HolidayListContainer } from '@lookup/components/holiday';
import { WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const holidayRoutes: React.StatelessComponent<AllProps> = props => (
  <Switch>
    <Route path={`/expense/request/`} component={HolidayListContainer} />
  </Switch>
);