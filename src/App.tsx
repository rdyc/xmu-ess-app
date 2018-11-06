import { accountRouter } from '@account/pages';
import AppStorage from '@constants/AppStorage';
import { ExpenseApprovalRouter, ExpenseRouter } from '@expense/components/ExpenseRouter';
import Layout from '@layout/components/base/Layout';
import Main from '@layout/components/main/Main';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppUser } from '@layout/interfaces';
import { HomePage } from '@layout/pages';
import AccessWizardPage from '@layout/pages/AccessWizardPage';
import CallbackPage from '@layout/pages/CallbackPage';
import { approvalRouter, leaveRouter } from '@leave/components/leaveRouter';
import { MileageApprovalRouter, MileageRequestRouter } from '@mileage/components/MileageRouter';
import { ProjectRoutingComponents } from '@project/components';
import {
  purchaseApprovalRouter,
  purchaseRouter,
  purchaseSettlementApprovalRouter,
  purchaseSettlementRouter,
} from '@purchase/components/PurchaseRouter';
import { timesheetApprovalRouter, timesheetRouter } from '@timesheet/components/timesheetRouter';
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

const app: React.ComponentType<AllProps> = props => {
  
  return (
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
                <Route exact path="/" component={Main} />
                <Route path="/access" component={AccessWizardPage} />
                <Route path="/callback" component={CallbackPage} />
                <Layout>
                  <Route path="/home" component={HomePage} />
                  <Route path="/account" component={accountRouter} />
                  <Route path="/project" component={ProjectRoutingComponents} />
                  <Route path="/leave" component={leaveRouter} />
                  <Route path="/approval/leave" component={approvalRouter} />
                  <Route path="/purchase/request" component={purchaseRouter} />
                  <Route path="/approval/purchase/request"
                    component={purchaseApprovalRouter}
                  />
                  <Route
                    path="/purchase/settlement"
                    component={purchaseSettlementRouter}
                  />
                  <Route
                    path="/approval/purchase/settlement"
                    component={purchaseSettlementApprovalRouter}
                  />
                  <Route path="/travel" component={travelRouter} />
                  <Route
                    path="/travel/settlement"
                    component={travelSettlementRouter}
                  />
                  <Route
                    path="/approval/travel"
                    component={travelApprovalRouter}
                  />
                  <Route path="/timesheet" component={timesheetRouter} />
                  <Route
                    path="/approval/timesheet"
                    component={timesheetApprovalRouter}
                  />
                  <Route path="/expense" component={ExpenseRouter} />
                  <Route
                    path="/approval/expense"
                    component={ExpenseApprovalRouter}
                  />
                  <Route path="/mileage" component={MileageRequestRouter} />
                  <Route path="/approval/mileage" component={MileageApprovalRouter} />

                  <Route path="/playground" component={playgroundRouter} />
                </Layout>
              </Switch>
            </Router>
          </ConnectedRouter>
        </OidcProvider>
      </IntlProvider>
    </Provider>
  );
};

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
  },
  componentWillReceiveProps(nextProps: AllProps) {
    console.log(nextProps);
    
  }
};

export const App = compose<AllProps, OwnProps>(
  withOidc,
  withUser,
  lifecycle(lifecycles)
)(app);
