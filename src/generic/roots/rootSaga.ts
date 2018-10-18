import employeeMySagas from '@account/store/sagas/employeeMySagas';
import employeeProfileSagas from '@account/store/sagas/employeeProfileSagas';
import employeeSagas from '@account/store/sagas/employeeSagas';
import commonActivitySagas from '@common/store/sagas/activitySagas';
import commonCurrencySagas from '@common/store/sagas/currencySagas';
import commonDocumentPresalesSagas from '@common/store/sagas/documentPresalesSagas';
import commonDocumentSagas from '@common/store/sagas/documentSagas';
import commonProjectSagas from '@common/store/sagas/projectSagas';
import commonSiteSagas from '@common/store/sagas/siteSagas';
import commonSystemSagas from '@common/store/sagas/systemSagas';
import expenseSagas from '@expense/store/sagas/expenseSagas';
import financeSagas from '@finance/store/sagas/financeSagas';
import commonNotificationSagas from '@layout/store/sagas/notificationSagas';
import leaveRequestSagas from '@leave/store/sagas/leaveRequestSagas';
import lookupCompanySagas from '@lookup/store/sagas/companySagas';
import lookupCurrencySagas from '@lookup/store/sagas/currencySagas';
import lookupDiemSagas from '@lookup/store/sagas/diemSagas';
import lookupHolidaySagas from '@lookup/store/sagas/holidaySagas';
import lookupLeaveSagas from '@lookup/store/sagas/leaveSagas';
import lookupCustomerSagas from '@lookup/store/sagas/lookupCustomerSagas';
import lookupMenuSagas from '@lookup/store/sagas/menuSagas';
import lookupMileageExceptionSagas from '@lookup/store/sagas/mileageExceptionSagas';
import lookupPositionSagas from '@lookup/store/sagas/positionSagas';
import lookupRoleSagas from '@lookup/store/sagas/roleSagas';
import lookupSystemLimitSagas from '@lookup/store/sagas/systemLimitSagas';
import mileageapprovalSagas from '@mileage/store/sagas/mileageapprovalSagas';
import mileagerequestSagas from '@mileage/store/sagas/mileagerequestSagas';
import projectRegistrationSagas from '@project/store/sagas/projectRegistrationSagas';
import purchaseSagas from '@purchase/store/sagas/purchaseSagas';
import timesheetSagas from '@timesheet/store/sagas/timesheetSagas';
import travelSagas from '@travel/store/sagas/travelSagas';
import travelSettlementSagas from '@travel/store/sagas/travelSettlementSagas';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    // common
    fork(commonSystemSagas),
    fork(commonActivitySagas),
    fork(commonCurrencySagas),
    fork(commonDocumentSagas),
    fork(commonDocumentPresalesSagas),
    fork(commonProjectSagas),
    fork(commonSiteSagas),
    fork(commonNotificationSagas),

    // lookup
    fork(lookupCustomerSagas),
    fork(lookupMileageExceptionSagas),
    fork(lookupCompanySagas),
    fork(lookupRoleSagas),
    fork(lookupDiemSagas), 
    fork(lookupMenuSagas),
    fork(lookupPositionSagas), 
    fork(lookupCurrencySagas), 
    fork(lookupSystemLimitSagas),
    fork(lookupHolidaySagas),
    fork(lookupLeaveSagas),
    
    // account
    fork(employeeSagas),
    fork(employeeMySagas),
    fork(employeeProfileSagas),

    // project
    fork(projectRegistrationSagas),
    
    // timesheet
    fork(timesheetSagas),
    
    // mileage
    fork(mileageapprovalSagas),
    fork(mileagerequestSagas),

    // expense
    fork(expenseSagas),
    
    // travel
    fork(travelSagas),
    fork(travelSettlementSagas),
    
    // purchase
    fork(purchaseSagas),
    
    // finance
    fork(financeSagas),
    
    // leave
    fork(leaveRequestSagas)
  ]);
}