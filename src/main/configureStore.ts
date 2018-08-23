import { Store, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import { AppState, rootReducer, rootSaga } from './store';
import userManager from './utils/userManager';
import { loadUser } from 'redux-oidc';

export default function configureStore(
  history: History,
  initialState: AppState
): Store<AppState> {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();

  userManager.events.addSilentRenewError((error) => {
    console.error('error while renewing the access token', error);
  });

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );

  // oidc
  loadUser(store, userManager);

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga);

  return store;
}