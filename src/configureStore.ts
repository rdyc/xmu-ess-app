import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import { rootReducer, rootSaga } from './generic/roots';
import { loadUser } from 'redux-oidc';
import { IAppState } from './generic/interfaces/IAppState';
import { AppUserManager } from './utils';

export default function configureStore(
  history: History,
  initialState: IAppState
): Store<IAppState> {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();

  AppUserManager.events.addSilentRenewError((error) => {
    console.error('error while renewing the access token', error);
  });

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );

  // oidc
  loadUser(store, AppUserManager);

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga);

  return store;
}