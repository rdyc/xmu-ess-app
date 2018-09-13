import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import { notificationReducer } from '../../modules/@layout/store/reducers/notificationReducer';
import { reducer as reduxFormReducer } from 'redux-form';
import { IAppState } from '../interfaces/IAppState';
import { employeeMyReducer } from '../../modules/account/stores/reducers/employeeMyReducer';
import { employeeProfileQueryReducer } from '../../modules/account/stores/reducers/employeeProfileQueryReducer';
import { employeeProfileCommandReducer } from '../../modules/account/stores/reducers/employeeProfileCommandReducer';
import { layoutReducer } from '../../modules/@layout/store/reducers/layoutReducer';

export const rootReducer = combineReducers<IAppState>({
  layout: layoutReducer,
  oidc: oidcReducer,
  account: employeeMyReducer,
  notification: notificationReducer,
  form: reduxFormReducer,
  profileQuery: employeeProfileQueryReducer,
  profileCommand: employeeProfileCommandReducer
});