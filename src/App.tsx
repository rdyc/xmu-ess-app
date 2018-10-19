import { accountRouter } from '@account/pages';
import { rootStore } from '@generic/roots';
import Layout from '@layout/components/base/Layout';
import { HomePage } from '@layout/pages';
import AccessWizardPage from '@layout/pages/AccessWizardPage';
import CallbackPage from '@layout/pages/CallbackPage';
import { projectRouter } from '@project/components/projectRouter';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { connect, Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { Store } from 'redux';
import { loadUser, OidcProvider, UserState } from 'redux-oidc';

// import { TimesheetRoot } from '@timesheet/components/TimesheetRoot';
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
  public componentDidMount() {
    AppUserManager.events.addSilentRenewError((error) => {
      console.error('error while renewing the access token', error);
    });

    loadUser(rootStore, AppUserManager);
  }

  public render() {   
    const { oidcState, store, history } = this.props;

    const onLogin = (event: any) => {
      event.preventDefault();
      AppUserManager.signinRedirect();
    };

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
                      <button onClick={onLogin}>Login</button>
                      <Route path="/callback" component={CallbackPage} />
                    </div>
                  )}

                  {oidcState.user && (
                    <Switch>
                      <Route exact path="/" component={AccessWizardPage} />
                      <Layout>
                        <Route path="/home" component={HomePage} />
                        <Route path="/account" component={accountRouter} />
                        {/* <Route path="/project" component={ProjectRoot} /> */}
                        {/* <Route path="/timesheet" component={TimesheetRoot} /> */}
                        <Route path="/project" component={projectRouter} />
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