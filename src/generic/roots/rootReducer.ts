import { employeeMyReducer, employeeProfileCommandReducer, employeeProfileQueryReducer } from '@account/stores/reducers';
import { IAppState } from '@generic/interfaces';
import { layoutReducer, listBarReducer, notificationReducer } from '@layout/store/reducers';
import { projectRegistrationQueryReducer } from '@project/store/reducers';
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as oidcReducer } from 'redux-oidc';

export const rootReducer = combineReducers<IAppState>({
  layout: layoutReducer,
  oidc: oidcReducer,
  account: employeeMyReducer,
  notification: notificationReducer,
  form: reduxFormReducer,

  /* list bar */
  listBar: listBarReducer,

  /* profile */
  profileQuery: employeeProfileQueryReducer,
  profileCommand: employeeProfileCommandReducer,

  /* project */
  projectQuery: projectRegistrationQueryReducer
});