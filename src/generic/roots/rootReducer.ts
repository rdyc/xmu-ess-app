import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as oidcReducer } from 'redux-oidc';

import { layoutReducer, notificationReducer } from '../../modules/@layout/store/reducers';
import { employeeMyReducer, employeeProfileCommandReducer, employeeProfileQueryReducer } from '../../modules/account/stores/reducers';
import { IAppState } from '../interfaces';

export const rootReducer = combineReducers<IAppState>({
  layout: layoutReducer,
  oidc: oidcReducer,
  account: employeeMyReducer,
  notification: notificationReducer,
  form: reduxFormReducer,
  profileQuery: employeeProfileQueryReducer,
  profileCommand: employeeProfileCommandReducer
});