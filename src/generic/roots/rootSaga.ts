import employeeMySagas from '@account/store/sagas/employeeMySagas';
import employeeProfileSagas from '@account/store/sagas/employeeProfileSagas';
import employeeSagas from '@account/store/sagas/employeeSagas';
import systemSagas from '@common/store/sagas/systemSagas';
import expenseSagas from '@expense/store/sagas/expenseSagas';
import financeSagas from '@finance/store/sagas/financeSagas';
import notificationSagas from '@layout/store/sagas/notificationSagas';
import leaveRequestSagas from '@leave/store/sagas/leaveRequestSagas';
import companySagas from '@lookup/store/sagas/companySagas';
import currencySagas from '@lookup/store/sagas/currencySagas';
import customerSagas from '@lookup/store/sagas/customerSagas';
import diemSagas from '@lookup/store/sagas/diemSagas';
import holidaySagas from '@lookup/store/sagas/holidaySagas';
import leaveSagas from '@lookup/store/sagas/leaveSagas';
import menuSagas from '@lookup/store/sagas/menuSagas';
import mileageExceptionSagas from '@lookup/store/sagas/mileageExceptionSagas';
import positionSagas from '@lookup/store/sagas/positionSagas';
import roleSagas from '@lookup/store/sagas/roleSagas';
import systemLimitSagas from '@lookup/store/sagas/systemLimitSagas';
import mileageapprovalSagas from '@mileage/store/sagas/mileageapprovalSagas';
import mileagerequestSagas from '@mileage/store/sagas/mileagerequestSagas';
import projectSagas from '@project/store/sagas/projectSagas';
import timesheetSagas from '@timesheet/store/sagas/timesheetSagas';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    // common
    fork(systemSagas),
    fork(notificationSagas),

    // lookup
    fork(customerSagas),
    fork(mileageExceptionSagas),
    fork(companySagas),
    fork(roleSagas),
    fork(diemSagas), 
    fork(menuSagas),
    fork(positionSagas), 
    fork(currencySagas), 
    fork(systemLimitSagas),
    fork(customerSagas), 
    fork(holidaySagas),
    fork(leaveSagas),
    
    // account
    fork(employeeSagas),
    fork(employeeMySagas),
    fork(employeeProfileSagas),

    // project
    fork(projectSagas),
    
    // timesheet
    fork(timesheetSagas),
    
    // mileage
    fork(mileageapprovalSagas),
    fork(mileagerequestSagas),

    // expense
    fork(expenseSagas),
    
    // finance
    fork(financeSagas),
    
    // leave
    fork(leaveRequestSagas)
  ]);
}