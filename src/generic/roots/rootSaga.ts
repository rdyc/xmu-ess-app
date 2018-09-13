import { all, fork } from 'redux-saga/effects';
import notificationSagas from '../../modules/@layout/store/sagas/notificationSagas';
import employeeMySagas from '../../modules/account/stores/sagas/employeeMySagas';
import employeeProfileSagas from '../../modules/account/stores/sagas/employeeProfileSagas';

export function* rootSaga() {
  yield all([
    fork(employeeMySagas), 
    fork(employeeProfileSagas), 
    fork(notificationSagas)
  ]);
}