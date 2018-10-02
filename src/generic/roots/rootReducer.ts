import {
  employeeGetAllReducer,
  employeeGetByIdReducer,
  employeeMyReducer,
  employeeProfileCommandReducer,
  employeeProfileQueryReducer,
} from '@account/store/reducers';
import { employeeGetListReducer } from '@account/store/reducers/employeeGetListReducer';
import { IAppState } from '@generic/interfaces';
import { appBarReducer, layoutReducer, listBarReducer, notificationReducer } from '@layout/store/reducers';
import { customerGetAllReducer, customerGetByIdReducer, customerGetListReducer } from '@lookup/store/reducers';
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

  /* common */

  /* lookup */
  customerGetAll: customerGetAllReducer,
  customerGetList: customerGetListReducer,
  customerGetById: customerGetByIdReducer,

  /* account */
  employeeGetAll: employeeGetAllReducer,
  employeeGetList: employeeGetListReducer,
  employeeGetById: employeeGetByIdReducer,

  /* profiles */
  profileQuery: employeeProfileQueryReducer,
  profileCommand: employeeProfileCommandReducer,

  /* projects */
  projectGetAll: projectGetAllReducer,
  projectGetById: projectGetByIdReducer,
});