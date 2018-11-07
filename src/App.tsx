import { AccountRoutingComponents } from '@account/components';
import AppStorage from '@constants/AppStorage';
import { DashboardRoutingComponents } from '@dashboard/components';
import { ExpenseRoutingComponents } from '@expense/components/ExpenseRoutingComponents';
import { FinanceRoutingComponents } from '@finance/components/FinanceRoutingComponents';
import { Callback, Root } from '@layout/components/base';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppUser } from '@layout/interfaces';
import { LeaveRoutingComponents } from '@leave/components/LeaveRoutingComponents';
import { MileageRoutingComponents } from '@mileage/components/MileageRouter';
import { ProjectRoutingComponents } from '@project/components';
import { PurchaseRoutingComponents } from '@purchase/components/PurchaseRoutingComponents';
import { TimesheetRoutingComponents } from '@timesheet/components';
import { travelApprovalRouter, travelRouter, travelSettlementRouter } from '@travel/components/travelRouter';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { playgroundRouter } from 'playground/playgroundRouter';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { Store } from 'redux';
import { loadUser, OidcProvider } from 'redux-oidc';
import * as store from 'store';

import { SummaryRoutingComponent } from '@summary/components/SummaryRouter';
import { IAppState } from './generic/interfaces';
import AppLocale from './language';
import config, { getCurrentLanguage } from './language/config';
import { AppUserManager } from './utils';

interface OwnProps {
  store: Store<IAppState>;
  history: History;
}

type AllProps = OwnProps & WithUser & WithOidc;

const languages = AppLocale[
  getCurrentLanguage(config.defaultLanguage || 'english').locale
];

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
              <Route exact path="/" component={Root} />
              <Route path="/callback" component={Callback} />
              
              <Route path="/home" component={DashboardRoutingComponents} />
              <Route path="/account" component={AccountRoutingComponents} />
              <Route path="/project" component={ProjectRoutingComponents} />
              <Route path="/mileage" component={MileageRoutingComponents} />
              <Route path="/leave" component={LeaveRoutingComponents} />
              <Route path="/purchase/" component={PurchaseRoutingComponents} />>
              <Route path="/travel" component={travelRouter} />
              <Route path="/travel/settlement" component={travelSettlementRouter} />
              <Route path="/approval/travel" component={travelApprovalRouter} />
              <Route path="/timesheet" component={TimesheetRoutingComponents} />
              <Route path="/expense" component={ExpenseRoutingComponents} />
              <Route path="/reports" component={SummaryRoutingComponent} />
              <Route path="/finance" component={FinanceRoutingComponents} />

              <Route path="/playground" component={playgroundRouter} />
            </Switch>
          </Router>
        </ConnectedRouter>
      </OidcProvider>
    </IntlProvider>
  </Provider>
);

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentWillMount() {
    const _user: IAppUser = store.get(AppStorage.User, undefined);

    if (_user) {
      this.props.assignUser(_user);
    }
  },
  componentDidMount() {
    // load odic user state
    loadUser(this.props.store, AppUserManager);
        
    // add oidc events
    AppUserManager.events.addSilentRenewError(error => {
      console.error('error while renewing the access token', error);
    });
  }
};

export const App = compose<AllProps, OwnProps>(
  withOidc,
  withUser,
  lifecycle(lifecycles)
)(app);
