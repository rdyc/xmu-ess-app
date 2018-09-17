import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as oidcReducer } from 'redux-oidc';

import { layoutReducer, notificationReducer } from '../../modules/@layout/store/reducers';
import { employeeMyReducer, employeeProfileCommandReducer, employeeProfileQueryReducer } from '../../modules/account/stores/reducers';
import { IAppState } from '../interfaces';
import { projectRegistrationQueryReducer } from '@project/store/reducers';

export const rootReducer = combineReducers<IAppState>({
  layout: layoutReducer,
  oidc: oidcReducer,
  account: employeeMyReducer,
  notification: notificationReducer,
  form: reduxFormReducer,

  /* profile */
  profileQuery: employeeProfileQueryReducer,
  profileCommand: employeeProfileCommandReducer,

  /* project */
  projectQuery: projectRegistrationQueryReducer
});