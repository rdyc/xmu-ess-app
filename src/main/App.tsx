import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import { ConnectedRouter } from 'connected-react-router';
import userManager from './utils/userManager';
import { AppState } from './store';
import { Store } from 'redux';
import { History } from 'history';
import { Router } from 'react-router';
import LayoutHeader from './components/layoutHeader';
import LayoutMenu from './components/layoutMenu';
import { User } from 'oidc-client';

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
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
          <ConnectedRouter history={history}>
            <Router history={history}>
              <div>      
                <LayoutHeader />
                <LayoutMenu />
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