import accountEmployeeLeaveSagas from '@account/store/sagas/accountEmployeeLeaveSagas';
import accountEmployeeSagas from '@account/store/sagas/accountEmployeeSagas';
import employeeMySagas from '@account/store/sagas/employeeMySagas';
import employeeProfileSagas from '@account/store/sagas/employeeProfileSagas';
import commonActivitySagas from '@common/store/sagas/activitySagas';
import commonCurrencySagas from '@common/store/sagas/currencySagas';
import commonDocumentPresalesSagas from '@common/store/sagas/documentPresalesSagas';
import commonDocumentSagas from '@common/store/sagas/documentSagas';
import commonExpenseSagas from '@common/store/sagas/expenseSagas';
import commonLeaveSagas from '@common/store/sagas/leaveSagas';
import commonProjectSagas from '@common/store/sagas/projectSagas';
import commonSiteSagas from '@common/store/sagas/siteSagas';
import commonStatusSagas from '@common/store/sagas/statusSagas';
import expenseApprovalSagas from '@expense/store/sagas/expenseApprovalSagas';
import expenseSagas from '@expense/store/sagas/expenseRequestSagas';
import financeSagas from '@finance/store/sagas/financeSagas';
import commonNotificationSagas from '@layout/store/sagas/notificationSagas';
import leaveApprovalSagas from '@leave/store/sagas/leaveApprovalSagas';
import leaveRequestSagas from '@leave/store/sagas/leaveRequestSagas';
import lookupCurrencySagas from '@lookup/store/sagas/currencySagas';
import lookupDiemSagas from '@lookup/store/sagas/diemSagas';
import lookupHolidaySagas from '@lookup/store/sagas/holidaySagas';
import lookupLeaveSagas from '@lookup/store/sagas/leaveSagas';
import lookupCompanySagas from '@lookup/store/sagas/lookupCompanySagas';
import lookupCustomerSagas from '@lookup/store/sagas/lookupCustomerSagas';
import lookupMileageExceptionSagas from '@lookup/store/sagas/lookupMileageExceptionSagas';
import lookupRoleSagas from '@lookup/store/sagas/lookupRoleSagas';
import lookupMenuSagas from '@lookup/store/sagas/menuSagas';
import lookupPositionSagas from '@lookup/store/sagas/positionSagas';
import lookupSystemLimitSagas from '@lookup/store/sagas/systemLimitSagas';
import mileageApprovalSagas from '@mileage/store/sagas/mileageApprovalSagas';
import mileageRequestSagas from '@mileage/store/sagas/mileageRequestSagas';
import projectOwnerSagas from '@project/store/sagas/projectOwnerSagas';
import projectRegistrationSagas from '@project/store/sagas/projectRegistrationSagas';
import projectSiteSagas from '@project/store/sagas/projectSiteSagas';
import projectStatusSagas from '@project/store/sagas/projectStatusSagas';
import purchaseSagas from '@purchase/store/sagas/purchaseSagas';
import timesheetApprovalSagas from '@timesheet/store/sagas/timesheetApprovalSagas';
import timesheetSagas from '@timesheet/store/sagas/timesheetSagas';
import travelSagas from '@travel/store/sagas/travelSagas';
import travelSettlementSagas from '@travel/store/sagas/travelSettlementSagas';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    // common
    fork(commonStatusSagas),
    fork(commonActivitySagas),
    fork(commonCurrencySagas),
    fork(commonDocumentSagas),
    fork(commonDocumentPresalesSagas),
    fork(commonLeaveSagas),
    fork(commonProjectSagas),
    fork(commonSiteSagas),
    fork(commonExpenseSagas),
    fork(commonStatusSagas),
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
    fork(accountEmployeeSagas),
    fork(accountEmployeeLeaveSagas),
    fork(employeeMySagas),
    fork(employeeProfileSagas),

    // project
    fork(projectRegistrationSagas),
    fork(projectOwnerSagas),
    fork(projectStatusSagas),
    fork(projectSiteSagas),
    
    // timesheet
    fork(timesheetSagas),
    fork(timesheetApprovalSagas),
    
    // mileage
    fork(mileageApprovalSagas),
    fork(mileageRequestSagas),

    // expense
    fork(expenseSagas),
    fork(expenseApprovalSagas),
    
    // travel
    fork(travelSagas),
    fork(travelSettlementSagas),
    
    // purchase
    fork(purchaseSagas),
    
    // finance
    fork(financeSagas),
    
    // leave
    fork(leaveRequestSagas),
    fork(leaveApprovalSagas)
  ]);
}