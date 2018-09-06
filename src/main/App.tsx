import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import { ConnectedRouter } from 'connected-react-router';
import userManager from './utils/userManager';
import { AppState } from './store';
import { Store } from 'redux';
import { History } from 'history';
import { Router, Route, Switch } from 'react-router';
import { User } from 'oidc-client';
import callbackPage from './pages/system/callbackPage';
import greetingPage from './pages/system/accessWizardPage';
import BasePage from './pages/basePage';
import homePage from './pages/main/homePage';
import { IntlProvider } from 'react-intl';
import AppLocale from './language';
import config, { getCurrentLanguage } from './language/config';
import { accountRouter } from './pages/main/account/accountRouter';

interface PropsFromState {
  user?: User;
  isLoadingUser: boolean;
}

interface OwnProps {
  store: Store<AppState>;
  history: History;
}

type AllProps = PropsFromState & OwnProps;

class App extends React.Component<AllProps> {
  public render() {   
    const { user, store, history } = this.props;

    const onLogin = (event: any) => {
      event.preventDefault();
      userManager.signinRedirect();
    };

    const currentAppLocale = AppLocale[getCurrentLanguage(config.defaultLanguage || 'english').locale];

    // wait for user to be loaded, and location is known
    if (this.props.isLoadingUser || !this.props.history.location) {
      return <div>Please wait...</div>;
    }

    // check if user is signed in
    // userManager.getUser().then(currentUser => {
    //   console.log(currentUser);

    //   if (!currentUser || currentUser.expired) {
    //     userManager.signinRedirect({ data: { path: window.location.pathname } });
    //     return null;
    //   } else {
    //     return <button onClick={onLogin}>Login</button>;
    //     // return <div>No User</div>;
    //   }
    // });

    // // wait for userManager to load the user
    // if (!user) {
    //   return <div>No User</div>;
    // }

    // return (
    //   <Provider store={store}>
    //     <OidcProvider store={store} userManager={userManager}>
    //       <ConnectedRouter history={history}>
    //         <IntlProvider
    //           locale={currentAppLocale.locale}
    //           messages={currentAppLocale.messages}
    //         >
    //           <Router history={history}>
    //             {this.props.history.location.pathname === '/callback' && (
    //               <Route path="/callback" component={callbackPage} />
    //             )}
    //             <Switch>
    //               <Route exact path="/" component={greetingPage} />
    //               <BasePage>
    //                 <Route path="/home" component={homePage} />
    //                 <Route path="/account" component={accountRouter} />
    //               </BasePage>
    //             </Switch>
    //           </Router>
    //         </IntlProvider>
    //       </ConnectedRouter>
    //     </OidcProvider>
    //   </Provider>
    // );

    return (
      <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
          <ConnectedRouter history={history}>
            <IntlProvider
              locale={currentAppLocale.locale}
              messages={currentAppLocale.messages}
            >
              <Router history={history}>
                <div>
                  {!user && (
                    <div>
                      <button onClick={onLogin}>Login</button>
                      <Route path="/callback" component={callbackPage} />
                    </div>
                  )}

                  {user && (
                    <Switch>
                      <Route exact path="/" component={greetingPage} />
                      <BasePage>
                        <Route path="/home" component={homePage} />
                        <Route path="/account" component={accountRouter} />
                      </BasePage>
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

const mapStateToProps = ({ oidc }: AppState) => ({
  user: oidc.user,
  isLoadingUser: oidc.isLoadingUser
});

export default connect(mapStateToProps)(App);