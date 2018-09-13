import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();