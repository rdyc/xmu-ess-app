// import FinanceDetail from '@finance/components/approval/FinanceDetail';
import FinanceList from '@finance/components/approval/FinanceList';
import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const FinanceRoute: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={FinanceList} />
    {/* <Route path={`${props.match.path}/details/:financeUid`} component={FinanceDetail} /> */}
  </Switch>
);