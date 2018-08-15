import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createHashHistory } from 'history'

import Main from './main';
import configureStore from './configureStore'

import './index.css';
import registerServiceWorker from './registerServiceWorker'

// We use hash history because this example is going to be hosted statically.
// Normally you would use browser history.
const history = createHashHistory()

const initialState = window.initialReduxState
const store = configureStore(history, initialState)

ReactDOM.render(
  <Main store={store} history={history} />,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()