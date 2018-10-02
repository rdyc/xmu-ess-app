import { IAppState } from '@generic/interfaces';
import { rootHistory, rootReducer, rootSaga } from '@generic/roots';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadUser } from 'redux-oidc';
import createSagaMiddleware from 'redux-saga';
import { AppUserManager } from 'utils';

const configureStore = (): Store<IAppState> => {  
  const initialState = window.initialReduxState;
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();

  AppUserManager.events.addSilentRenewError((error) => {
    console.error('error while renewing the access token', error);
  });

  const store = createStore(
    connectRouter(rootHistory)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(rootHistory), sagaMiddleware))
  );

  // oidc
  loadUser(store, AppUserManager);

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga);

  return store;
};

export const rootStore = configureStore();