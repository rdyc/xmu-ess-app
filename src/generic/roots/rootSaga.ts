import { all, fork } from 'redux-saga/effects';
import employeeMySagas from '@account/stores/sagas/employeeMySagas';
import employeeProfileSagas from '@account/stores/sagas/employeeProfileSagas';
import notificationSagas from '@layout/store/sagas/notificationSagas';
import projectRegistrationQuerySagas from '@project/store/sagas/projectRegistrationQuerySagas';

export function* rootSaga() {
  yield all([
    fork(employeeMySagas), 
    fork(employeeProfileSagas), 
    fork(notificationSagas),
    fork(projectRegistrationQuerySagas),
  ]);
}