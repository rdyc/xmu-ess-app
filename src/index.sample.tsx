import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import Main from './sample/main';
import configureStore from './sample/configureStore';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

ReactDOM.render(
  <Main store={store} history={history} />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();