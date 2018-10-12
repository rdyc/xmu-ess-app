import employeeMySagas from '@account/store/sagas/employeeMySagas';
import employeeProfileSagas from '@account/store/sagas/employeeProfileSagas';
import employeeSagas from '@account/store/sagas/employeeSagas';
import systemSagas from '@common/store/sagas/systemSagas';
import notificationSagas from '@layout/store/sagas/notificationSagas';
import currencySagas from '@lookup/store/sagas/currencySagas';
import customerSagas from '@lookup/store/sagas/customerSagas';
import systemLimitSagas from '@lookup/store/sagas/systemLimitSagas';
import projectSagas from '@project/store/sagas/projectSagas';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    // common
    fork(systemSagas),
    fork(notificationSagas),
    
    // lookup
    fork(customerSagas),
    fork(currencySagas), 
    fork(systemLimitSagas),
    
    // account
    fork(employeeSagas), 
    fork(employeeMySagas), 
    fork(employeeProfileSagas), 
    
    // project
    fork(projectSagas),
  ]);
}