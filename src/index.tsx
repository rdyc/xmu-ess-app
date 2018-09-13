import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';

const history = createBrowserHistory();
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();