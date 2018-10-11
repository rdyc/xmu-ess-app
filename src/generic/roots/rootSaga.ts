import employeeMySagas from '@account/store/sagas/employeeMySagas';
import employeeProfileSagas from '@account/store/sagas/employeeProfileSagas';
import employeeSagas from '@account/store/sagas/employeeSagas';
import activitySagas from '@common/store/sagas/activitySagas';
import currencySagas from '@common/store/sagas/currencySagas';
import projectSagas from '@common/store/sagas/projectSagas';
import systemSagas from '@common/store/sagas/systemSagas';
import notificationSagas from '@layout/store/sagas/notificationSagas';
import customerSagas from '@lookup/store/sagas/customerSagas';
import projectRegistrationSagas from '@project/store/sagas/projectSagas';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    // common
    fork(systemSagas),
    fork(activitySagas),
    fork(currencySagas),
    fork(projectSagas),
    fork(notificationSagas),
    
    // lookup
    fork(customerSagas), 
    
    // account
    fork(employeeSagas), 
    fork(employeeMySagas), 
    fork(employeeProfileSagas), 
    
    // project
    fork(projectRegistrationSagas),
  ]);
}