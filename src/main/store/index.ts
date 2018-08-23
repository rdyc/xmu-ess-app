import { combineReducers, Dispatch, Action, AnyAction } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { reducer as oidcReducer, UserState } from 'redux-oidc';
import { appUserReducer } from './user/reducer';
import appUserSaga from './user/sagas';
import { AppUserState } from './user/types';
import { LayoutState, layoutReducer } from './layout';

export interface AppState {
  layout: LayoutState;
  oidc: UserState;
  user: AppUserState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = combineReducers<AppState>({
  layout: layoutReducer,
  oidc: oidcReducer,
  user: appUserReducer
});

export function* rootSaga() {
  yield all([fork(appUserSaga)]);
}