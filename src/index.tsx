import { rootHistory, rootStore } from '@generic/roots';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App store={rootStore} history={rootHistory} />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();