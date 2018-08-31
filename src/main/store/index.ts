import { combineReducers, Dispatch, Action, AnyAction } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { reducer as oidcReducer, UserState } from 'redux-oidc';
import { accountEmployeeReducer } from './account/accountEmployeeReducer';
import accountEmployeeMySagas from './account/accountEmployeeMySagas';
import { LayoutState, layoutReducer } from './@layout';
import { AccountEmployeeMyState } from './account/states/AccountEmployeeMyState';
import { NotificationState } from './notification/states/NotificationState';
import { notificationReducer } from './notification/NotificationReducer';
import notificationSagas from './notification/NotificationSagas';

export interface AppState {
  layout: LayoutState;
  oidc: UserState;
  account: AccountEmployeeMyState;
  notification: NotificationState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = combineReducers<AppState>({
  layout: layoutReducer,
  oidc: oidcReducer,
  account: accountEmployeeReducer,
  notification: notificationReducer
});

export function* rootSaga() {
  yield all([
    fork(accountEmployeeMySagas), 
    fork(notificationSagas)
  ]);
}