import { employeeMyReducer, employeeProfileCommandReducer, employeeProfileQueryReducer } from '@account/stores/reducers';
import { IAppState } from '@generic/interfaces';
import { layoutReducer, listBarReducer, notificationReducer, appBarReducer } from '@layout/store/reducers';
import { projectGetAllReducer } from '@project/store/reducers';
import { projectGetByIdReducer } from '@project/store/reducers/projectGetByIdReducer';
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as oidcReducer } from 'redux-oidc';

export const rootReducer = combineReducers<IAppState>({
  layout: layoutReducer,
  oidc: oidcReducer,
  account: employeeMyReducer,
  notification: notificationReducer,
  form: reduxFormReducer,

  /* app bar */
  appBar: appBarReducer,

  /* list bar */
  listBar: listBarReducer,

  /* profiles */
  profileQuery: employeeProfileQueryReducer,
  profileCommand: employeeProfileCommandReducer,

  /* projects */
  projectGetAll: projectGetAllReducer,
  projectGetById: projectGetByIdReducer,
});