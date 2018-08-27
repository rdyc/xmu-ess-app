import { combineReducers, Dispatch, Action, AnyAction } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { reducer as oidcReducer, UserState } from 'redux-oidc';
import { accountEmployeeReducer } from './account/accountEmployeeReducer';
import accountEmployeeMySaga from './account/accountEmployeeMySagas';
import { LayoutState, layoutReducer } from './@layout';
import { AccountEmployeeMyState } from './account/states/AccountEmployeeMyState';

export interface AppState {
  layout: LayoutState;
  oidc: UserState;
  account: AccountEmployeeMyState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = combineReducers<AppState>({
  layout: layoutReducer,
  oidc: oidcReducer,
  account: accountEmployeeReducer
});

export function* rootSaga() {
  yield all([fork(accountEmployeeMySaga)]);
}