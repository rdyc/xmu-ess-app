import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import { ConnectedRouter } from 'connected-react-router';
import userManager from './utils/userManager';
import { AppState } from './store';
import { Store } from 'redux';
import { History } from 'history';
import { ThemeAnchors, MenuDrawerOpen } from './store/layout';
import { Router } from 'react-router';
import LayoutHeader from './components/layoutHeader';
import LayoutMenu from './components/layoutMenu';

interface PropsFromState {
  anchor: ThemeAnchors;
  menuDrawerOpen: MenuDrawerOpen;
}

interface PropsFromDispatch {
  [key: string]: any;
}

interface OwnProps {
  store: Store<AppState>;
  history: History;
}

type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

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

const mapStateToProps = ({ layout }: AppState) => ({
  anchor: layout.anchor,
  menuDrawerOpen: layout.menuDrawer
});

export default connect<PropsFromState, PropsFromDispatch, OwnProps, AppState>(mapStateToProps)(App);