import accountEmployeeSagas from '@account/store/sagas/accountEmployeeSagas';
import employeeMySagas from '@account/store/sagas/employeeMySagas';
import employeeProfileSagas from '@account/store/sagas/employeeProfileSagas';
import commonActivitySagas from '@common/store/sagas/activitySagas';
import commonCurrencySagas from '@common/store/sagas/currencySagas';
import commonDocumentPresalesSagas from '@common/store/sagas/documentPresalesSagas';
import commonDocumentSagas from '@common/store/sagas/documentSagas';
import commonProjectSagas from '@common/store/sagas/projectSagas';
import commonSiteSagas from '@common/store/sagas/siteSagas';
import commonStatusSagas from '@common/store/sagas/statusSagas';
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
import mileageApprovalSagas from '@mileage/store/sagas/mileageApprovalSagas';
import mileageRequestSagas from '@mileage/store/sagas/mileageRequestSagas';
import projectAcceptanceSagas from '@project/store/sagas/projectAcceptanceSagas';
import projectApprovalSagas from '@project/store/sagas/projectApprovalSagas';
import projectAssignmentSagas from '@project/store/sagas/projectAssignmentSagas';
import projectOwnerSagas from '@project/store/sagas/projectOwnerSagas';
import projectRegistrationSagas from '@project/store/sagas/projectRegistrationSagas';
import projectSiteSagas from '@project/store/sagas/projectSiteSagas';
import projectStatusSagas from '@project/store/sagas/projectStatusSagas';
import purchaseSagas from '@purchase/store/sagas/purchaseSagas';
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
    fork(commonProjectSagas),
    fork(commonSiteSagas),
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
    fork(employeeMySagas),
    fork(employeeProfileSagas),

    // project
    fork(projectRegistrationSagas),
    fork(projectOwnerSagas),
    fork(projectStatusSagas),
    fork(projectSiteSagas),
    fork(projectApprovalSagas),
    fork(projectAssignmentSagas),
    fork(projectAcceptanceSagas),
    
    // timesheet
    fork(timesheetSagas),
    
    // mileage
    fork(mileageApprovalSagas),
    fork(mileageRequestSagas),

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