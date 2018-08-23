import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import { ConnectedRouter } from 'connected-react-router';
import userManager from './utils/userManager';
import { AppState } from './store';
import { Store } from 'redux';
import { History } from 'history';
import { ThemeAnchors } from './store/layout';

interface PropsFromState {
  anchor: ThemeAnchors;
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
            <div className="App">
              <header className="App-header">
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                To get started, edit <code>src/App.tsx</code> and save to reload.
              </p>
            </div>
          </ConnectedRouter>
        </OidcProvider>
      </Provider>
    );
  }
}

const mapStateToProps = ({ layout }: AppState) => ({
  anchor: layout.anchor
});

// tslint:disable-next-line:max-line-length
export default connect<PropsFromState, PropsFromDispatch, OwnProps, AppState>(mapStateToProps)(App);