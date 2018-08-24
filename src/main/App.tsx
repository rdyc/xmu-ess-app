import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import { ConnectedRouter } from 'connected-react-router';
import userManager from './utils/userManager';
import { AppState } from './store';
import { Store } from 'redux';
import { History } from 'history';
import { Router, Route } from 'react-router';
// import LayoutContainer from './components/layouts/layoutContainer';
import { User } from 'oidc-client';
import callbackPage from './pages/system/callbackPage';
import greetingPage from './pages/system/greetingPage';

interface PropsFromState {
  user?: User;
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

    return (
      <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
          <ConnectedRouter history={history}>
            <Router history={history}>
              <div>
                {!user && (
                  <div>
                    <button onClick={onLogin}>Login</button>
                    <Route path="/callback" component={callbackPage} />
                  </div>
                )}

                {user && (
                  <Route exact path="/" component={greetingPage} />
                )}
              </div>
            </Router>
          </ConnectedRouter>
        </OidcProvider>
      </Provider>
    );
  }
}

const mapStateToProps = ({ oidc }: AppState) => ({
  user: oidc.user
});

export default connect(mapStateToProps)(App);