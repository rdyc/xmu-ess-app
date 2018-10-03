import {
  employeeGetAllReducer,
  employeeGetByIdReducer,
  employeeMyReducer,
  employeeProfileCommandReducer,
  employeeProfileQueryReducer,
} from '@account/store/reducers';
import { employeeGetListReducer } from '@account/store/reducers/employeeGetListReducer';
import { systemGetAllReducer, systemGetByIdReducer, systemGetListReducer } from '@common/store/reducers';
import { IAppState } from '@generic/interfaces';
import { appBarReducer, layoutReducer, listBarReducer, notificationReducer } from '@layout/store/reducers';
import { customerGetAllReducer, customerGetByIdReducer, customerGetListReducer } from '@lookup/store/reducers';
import {
  projectGetAllReducer,
  projectGetByIdReducer,
  projectGetListReducer,
  projectPostReducer,
  projectPutReducer,
} from '@project/store/reducers';
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
  systemGetAll: systemGetAllReducer,
  systemGetList: systemGetListReducer,
  systemGetById: systemGetByIdReducer,

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
  projectGetList: projectGetListReducer,
  projectGetById: projectGetByIdReducer,
  projectPost: projectPostReducer,
  projectPut: projectPutReducer,
});