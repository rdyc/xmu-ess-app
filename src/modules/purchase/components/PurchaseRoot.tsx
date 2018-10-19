import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { WithStyles } from '@material-ui/core';
import PurchaseRequestDetail from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetail';
import PurchaseRequestEditor from '@purchase/components/purchaseRequest/editor/PurchaseRequestEditor';
import PurchaseRequestList from '@purchase/components/purchaseRequest/list/PurchaseRequestList';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const PurchaseRoot: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/list/`} component={PurchaseRequestList} />
    <Route path={`${props.match.path}/details/:purchaseUid`} component={PurchaseRequestDetail} />
    <Route path={`${props.match.path}/form`} component={PurchaseRequestEditor} />
  </Switch>
);