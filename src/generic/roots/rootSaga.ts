import employeeMySagas from '@account/store/sagas/employeeMySagas';
import employeeProfileSagas from '@account/store/sagas/employeeProfileSagas';
import employeeSagas from '@account/store/sagas/employeeSagas';
import systemSagas from '@common/store/sagas/systemSagas';
import notificationSagas from '@layout/store/sagas/notificationSagas';
import customerSagas from '@lookup/store/sagas/customerSagas';
import menuSagas from '@lookup/store/sagas/menuSagas';
import positionSagas from '@lookup/store/sagas/positionSagas';
import projectSagas from '@project/store/sagas/projectSagas';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    // common
    fork(systemSagas),
    fork(notificationSagas),
    
    // lookup
    fork(customerSagas),
    fork(menuSagas),
    fork(positionSagas), 
    
    // account
    fork(employeeSagas), 
    fork(employeeMySagas), 
    fork(employeeProfileSagas), 
    
    // project
    fork(projectSagas),
  ]);
}