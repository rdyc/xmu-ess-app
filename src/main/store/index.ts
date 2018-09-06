import { combineReducers, Dispatch, Action, AnyAction } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { reducer as oidcReducer, UserState } from 'redux-oidc';
import { employeeMyReducer } from './account/reducers/employeeMyReducer';
import employeeMySagas from './account/sagas/employeeMySagas';
import { LayoutState, layoutReducer } from './@layout';
import { EmployeeMyState } from './account/states/EmployeeMyState';
import { NotificationState } from './notification/states/NotificationState';
import { notificationReducer } from './notification/NotificationReducer';
import notificationSagas from './notification/NotificationSagas';
import employeeProfileSagas from './account/sagas/employeeProfileSagas';
import { reducer as reduxFormReducer, FormStateMap } from 'redux-form';
import { employeeProfileQueryReducer } from './account/reducers/employeeProfileQueryReducer';
import { EmployeeProfileQueryState, EmployeeProfileCommandState } from './account/states/EmployeeProfileState';
import { employeeProfileCommandReducer } from './account/reducers/employeeProfileCommandReducer';

export interface AppState {
  layout: LayoutState;
  oidc: UserState;
  account: EmployeeMyState;
  notification: NotificationState;
  form: FormStateMap;

  /* profile */
  profileQuery: EmployeeProfileQueryState;
  profileCommand: EmployeeProfileCommandState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = combineReducers<AppState>({
  layout: layoutReducer,
  oidc: oidcReducer,
  account: employeeMyReducer,
  notification: notificationReducer,
  form: reduxFormReducer,
  profileQuery: employeeProfileQueryReducer,
  profileCommand: employeeProfileCommandReducer
});

export function* rootSaga() {
  yield all([
    fork(employeeMySagas), 
    fork(employeeProfileSagas), 
    fork(notificationSagas)
  ]);
}