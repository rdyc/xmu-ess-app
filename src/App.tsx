import { accountRouter } from '@account/pages';
import { ExpenseApprovalRouter, ExpenseRouter } from '@expense/components/ExpenseRouter';
import { rootStore } from '@generic/roots';
import Layout from '@layout/components/base/Layout';
import Main from '@layout/components/main/Main';
import { HomePage } from '@layout/pages';
import AccessWizardPage from '@layout/pages/AccessWizardPage';
import CallbackPage from '@layout/pages/CallbackPage';
import { approvalRouter, leaveRouter } from '@leave/components/leaveRouter';
import { LookupRouter } from '@lookup/components/LookupRouter';
import { MileageApprovalRouter, MileageRequestRouter } from '@mileage/components/MileageRouter';
import { projectRouter } from '@project/components/projectRouter';
import { purchaseApprovalRouter, purchaseRouter, purchaseSettlementApprovalRouter, purchaseSettlementRouter } from '@purchase/components/PurchaseRouter';
import { timesheetApprovalRouter, timesheetRouter } from '@timesheet/components/timesheetRouter';
import { travelApprovalRouter, travelRouter } from '@travel/components/travelRouter';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { connect, Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { Store } from 'redux';
import { loadUser, OidcProvider, UserState } from 'redux-oidc';
import { IAppState } from './generic/interfaces';
import AppLocale from './language';
import config, { getCurrentLanguage } from './language/config';
import { AppUserManager } from './utils';

interface PropsFromState {
  oidcState: UserState;
}

interface OwnProps {
  store: Store<IAppState>;
  history: History;
}

type AllProps = PropsFromState & OwnProps;

class App extends React.Component<AllProps> {
  public componentWillMount() {
    // load odic user state
    loadUser(rootStore, AppUserManager);

    // add oidc events
    AppUserManager.events.addSilentRenewError((error) => {
      console.error('error while renewing the access token', error);
    });
  }

  public render() {
    const { oidcState, store, history } = this.props;

    const currentAppLocale = AppLocale[getCurrentLanguage(config.defaultLanguage || 'english').locale];

    // wait for user to be loaded, and location is known
    if (oidcState.isLoadingUser /*|| !history.location*/) {
      return <div>Please wait...</div>;
    }

    return (
      <Provider store={store}>
        <OidcProvider store={store} userManager={AppUserManager}>
          <ConnectedRouter history={history}>
            <IntlProvider
              locale={currentAppLocale.locale}
              defaultLocale={currentAppLocale.locale}
              messages={currentAppLocale.messages}
            >
              <Router history={history}>
                <div>
                  {!oidcState.user && (
                    <div>
                      <Route exact path="/" component={Main} />
                      <Route path="/callback" component={CallbackPage} />
                    </div>
                  )}

                  {oidcState.user && (
                    <Switch>
                      <Route exact path="/" component={AccessWizardPage} />
                      <Layout>
                        <Route path="/home" component={HomePage} />
                        <Route path="/account" component={accountRouter} />
                        <Route path="/mileage" component={MileageRequestRouter} />
                        <Route path="/lookup" component={LookupRouter} />
                        <Route path="/project" component={projectRouter} />
                        <Route path="/approval/mileage" component={MileageApprovalRouter} />
                        <Route path="/leave" component={leaveRouter} />
                        <Route path="/approval/leave" component={approvalRouter} />
                        <Route path="/project" component={projectRouter} />
                        <Route path="/purchase/request" component={purchaseRouter} />
                        <Route path="/approval/purchase/request" component={purchaseApprovalRouter} />
                        <Route path="/purchase/settlement" component={purchaseSettlementRouter} />
                        <Route path="/approval/purchase/settlement" component={purchaseSettlementApprovalRouter} />
                        <Route path="/travel" component={travelRouter} />
                        <Route path="/approval/travel" component={travelApprovalRouter} />                                                
                        <Route path="/timesheet" component={timesheetRouter} />
                        <Route path="/approval/timesheet" component={timesheetApprovalRouter} />
                        <Route path="/expense" component={ExpenseRouter} />
                        <Route path="/approval/expense" component={ExpenseApprovalRouter} />
                      </Layout>
                    </Switch>
                  )}
                </div>
              </Router>
            </IntlProvider>
          </ConnectedRouter>
        </OidcProvider>
      </Provider>
    );
  }
}

const mapStateToProps = ({ oidc }: IAppState) => ({
  oidcState: oidc
});

export default connect(mapStateToProps)(App);
