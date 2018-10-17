import ExpenseDetail from '@expense/components/request/ExpenseDetail';
// import ExpenseEditor from '@expense/components/request/ExpenseEditor';
import ExpenseList from '@expense/components/request/ExpenseList';
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

export const ExpenseRoute: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={ExpenseList} />
    <Route path={`${props.match.path}/details/:expenseUid`} component={ExpenseDetail} />
    {/* <Route path={`${props.match.path}/form`} component={ExpenseEditor} /> */}
  </Switch>
);