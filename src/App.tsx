import { AccountRoutingComponents } from '@account/components';
import { AccountAccess } from '@account/components/access';
import { CommonRoutingComponents } from '@common/components/CommonRoutingComponents';
import AppStorage from '@constants/AppStorage';
import { ExpenseRoutingComponents } from '@expense/components/ExpenseRoutingComponents';
import { FinanceRoutingComponents } from '@finance/components/FinanceRoutingComponents';
import { HomeRoutingComponents } from '@home/components';
import { KPIRoutingComponents } from '@kpi/components/KPIRouter';
import { Callback, SigninPopupCallback, SilentRenew } from '@layout/components/base';
import { LandingPage } from '@layout/components/landingPage/LandingPage';
import { MasterPage } from '@layout/components/masterPage/MasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppUser } from '@layout/interfaces';
import { LeaveRoutingComponents } from '@leave/components/LeaveRoutingComponents';
import { LookupRoutingComponents } from '@lookup/components/LookupRoutingComponents';
import { MileageRoutingComponents } from '@mileage/components/MileageRouter';
import { OrganizationRoutingComponents } from '@organization/components/OrganizationRoutingComponents';
import { ProjectRoutingComponents } from '@project/components';
import { PurchaseRoutingComponents } from '@purchase/components/PurchaseRoutingComponents';
import { SummaryRoutingComponents } from '@summary/components/SummaryRoutingComponents';
import { TimesheetRoutingComponents } from '@timesheet/components';
import { TravelRoutingComponents } from '@travel/components';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { User } from 'oidc-client';
import { playgroundRouter } from 'playground/playgroundRouter';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { Store } from 'redux';
import { loadUser, OidcProvider } from 'redux-oidc';
import * as store from 'store';

import { IAppState } from './generic/interfaces';
import AppLocale from './language';
import config, { getCurrentLanguage } from './language/config';
import { AppUserManager } from './utils';

const languages = AppLocale[
  getCurrentLanguage(config.defaultLanguage || 'english').locale
];

interface IOwnProps {
  store: Store<IAppState>;
  history: History;
}

type AllProps 
  = IOwnProps 
  & WithUser 
  & WithOidc;

const app: React.ComponentType<AllProps> = props => (
  <Provider store={props.store}>
    <IntlProvider
      locale={languages.locale}
      defaultLocale={languages.locale}
      messages={languages.messages}
    >
      <OidcProvider store={props.store} userManager={AppUserManager}>
        <ConnectedRouter history={props.history}>
          <Router history={props.history}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/signin" component={SigninPopupCallback} />
              <Route path="/silent_renew" component={SilentRenew} />
              <Route path="/callback" component={Callback} />
              <Route path="/account/access" component={AccountAccess} />

              <MasterPage>
                <Route path="/home" component={HomeRoutingComponents} />
                <Route path="/account" component={AccountRoutingComponents} />
                <Route path="/project" component={ProjectRoutingComponents} />
                <Route path="/mileage" component={MileageRoutingComponents} />
                <Route path="/leave" component={LeaveRoutingComponents} />
                <Route path="/purchase" component={PurchaseRoutingComponents} />
                <Route path="/timesheet" component={TimesheetRoutingComponents} />
                <Route path="/expense" component={ExpenseRoutingComponents} />
                <Route path="/reports" component={SummaryRoutingComponents} />
                <Route path="/finance" component={FinanceRoutingComponents} />
                <Route path="/travel" component={TravelRoutingComponents} />
                <Route path="/common" component={CommonRoutingComponents} />
                <Route path="/lookup" component={LookupRoutingComponents} />
                <Route path="/organization" component={OrganizationRoutingComponents} />
                <Route path="/kpi" component={KPIRoutingComponents} />

                <Route path="/playground" component={playgroundRouter} />
              </MasterPage>
            </Switch>
          </Router>
        </ConnectedRouter>
      </OidcProvider>
    </IntlProvider>
  </Provider>
);

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentWillMount() {
    // add oidc events
    AppUserManager.events.addUserLoaded((user: User) => {
      console.info('user loaded');

      this.props.history.push('/account/access');
    });

    AppUserManager.events.addUserUnloaded(() => {
      console.info('user unloaded');

      store.remove(AppStorage.Profile);
      store.remove(AppStorage.Access);
    });

    AppUserManager.events.addAccessTokenExpiring(() => {
      console.warn('token expiring');
    });
    
    AppUserManager.events.addAccessTokenExpired(() => {
      console.warn('token expired');

      store.remove(AppStorage.Profile);
      store.remove(AppStorage.Access);
      
      this.props.history.push('/');
    });
    
    AppUserManager.events.addSilentRenewError(error => {
      console.error('silent renew error', error);
    });
    
    AppUserManager.events.addUserSignedOut(() => {
      console.info('user signed out');

      store.remove(AppStorage.Profile);
      store.remove(AppStorage.Access);

      this.props.history.push('/');
    });
  },
  componentDidMount() {
    // load odic user state
    loadUser(this.props.store, AppUserManager).then((user: User) => {
      if (!user) {
        console.warn('no user found');
        
        // no user access found, redirect to main
        this.props.history.push('/');
      } else {
        console.info('user found');

        // found user access, then get user profile
        const appUser: IAppUser = store.get(AppStorage.Profile, undefined);

        if (appUser) {
          // user profile exist
          this.props.assignUser(appUser);
        } else {
          // push to select user access
          this.props.history.push('/account/access');
        }
      }
    });
  }
};

export const App = compose<AllProps, IOwnProps>(
  withOidc,
  withUser,
  lifecycle(lifecycles)
)(app);