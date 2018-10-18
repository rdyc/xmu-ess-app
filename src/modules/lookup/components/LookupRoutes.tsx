import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
// import { CurrencyDetailContainer, CurrencyListContainer } from '@lookup/components/currency';
// import { SystemLimitDetailContainer, SystemLimitListContainer } from '@lookup/components/systemLimit';
import MileageExceptionList from '@lookup/components/mileageException/MileageExceptionList';
// import MileageExceptionDetail from "@lookup/components/mileageException/MileageExceptionDetail";
// ";
import { WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

interface PropsFromState
  extends RouteComponentProps<void>,
    WithStyles<typeof styles> {
  user: IAppUser;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const LookupRoutes: React.SFC<AllProps> = props => (
  <Switch>
    <Route
      path={`${props.match.path}/mileageexception/list`}
      component={MileageExceptionList}
    />
    {/* <Route
      path={`${props.match.path}/mileageexception/details/:mileageexceptionUid`}
      component={MileageExceptionDetail}
    /> */}
    {/* <Route path={`${props.match.path}/currency/list/`} component={CurrencyListContainer} />
    <Route path={`${props.match.path}/currency/details/:currencyUid`} component={CurrencyDetailContainer} />
    <Route path={`${props.match.path}/systemlimit/list/`} component={SystemLimitListContainer} />
    <Route path={`${props.match.path}/systemlimit/details/:companyUid/:systemLimitUid`} component={SystemLimitDetailContainer} /> */}
  </Switch>
);
