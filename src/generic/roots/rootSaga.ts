import accountEmployeeAccessHistorySagas from '@account/store/sagas/accountEmployeeAccessHistorySagas';
import accountEmployeeEducationSagas from '@account/store/sagas/accountEmployeeEducationSagas';
import accountEmployeeExperienceSagas from '@account/store/sagas/accountEmployeeExperienceSagas';
import accountEmployeeFamilySagas from '@account/store/sagas/accountEmployeeFamilySagas';
import accountEmployeeLeaveSagas from '@account/store/sagas/accountEmployeeLeaveSagas';
import accountEmployeeMySagas from '@account/store/sagas/accountEmployeeMySagas';
import accountEmployeeNoteSagas from '@account/store/sagas/accountEmployeeNoteSagas';
import accountEmployeeRateSagas from '@account/store/sagas/accountEmployeeRateSagas';
import accountEmployeeSagas from '@account/store/sagas/accountEmployeeSagas';
import accountEmployeeTrainingSagas from '@account/store/sagas/accountEmployeeTrainingSagas';
import commonActivitySagas from '@common/store/sagas/activitySagas';
import commonBloodSagas from '@common/store/sagas/bloodSagas';
import commonCertificationSagas from '@common/store/sagas/certificationSagas';
import commonCurrencySagas from '@common/store/sagas/currencySagas';
import commonDegreeSagas from '@common/store/sagas/degreeSagas';
import commonDepartmentSagas from '@common/store/sagas/departmentSagas';
import commonDestinationSagas from '@common/store/sagas/destinationSagas';
import commonDocumentPresalesSagas from '@common/store/sagas/documentPresalesSagas';
import commonDocumentSagas from '@common/store/sagas/documentSagas';
import commonEmploymentSagas from '@common/store/sagas/employmentSagas';
import commonExpenseSagas from '@common/store/sagas/expenseSagas';
import commonFamilySagas from '@common/store/sagas/familySagas';
import commonFinanceSagas from '@common/store/sagas/financeSagas';
import commonGenderSagas from '@common/store/sagas/genderSagas';
import commonGradeSagas from '@common/store/sagas/gradeSagas';
import commonLeaveSagas from '@common/store/sagas/leaveSagas';
import commonLevelSagas from '@common/store/sagas/levelSagas';
import commonLimiterSagas from '@common/store/sagas/limiterSagas';
import commonPaymentSagas from '@common/store/sagas/paymentSagas';
import commonProjectSagas from '@common/store/sagas/projectSagas';
import commonPurposeSagas from '@common/store/sagas/purposeSagas';
import commonRelationSagas from '@common/store/sagas/relationSagas';
import commonReligionSagas from '@common/store/sagas/religionSagas';
import commonSiteSagas from '@common/store/sagas/siteSagas';
import commonStatusSagas from '@common/store/sagas/statusSagas';
import commonSystemSagas from '@common/store/sagas/systemSagas';
import commonTaxSagas from '@common/store/sagas/taxSagas';
import commonTrainingSagas from '@common/store/sagas/trainingSagas';
import commonTransportationSagas from '@common/store/sagas/transportationSagas';
import commonUnitSagas from '@common/store/sagas/unitSagas';
import expenseApprovalSagas from '@expense/store/sagas/expenseApprovalSagas';
import expenseSagas from '@expense/store/sagas/expenseRequestSagas';
import financeSagas from '@finance/store/sagas/financeApprovalSagas';
import chartSagas from '@home/store/sagas/chartSagas';
import landingPageSagas from '@layout/store/sagas/landingPageSagas';
import commonNotificationSagas from '@layout/store/sagas/notificationSagas';
import leaveApprovalSagas from '@leave/store/sagas/leaveApprovalSagas';
import leaveCancellationSagas from '@leave/store/sagas/leaveCancellationSagas';
import leaveRequestSagas from '@leave/store/sagas/leaveRequestSagas';
import lookupCurrencySagas from '@lookup/store/sagas/currencySagas';
import leaveCalculationSagas from '@lookup/store/sagas/leaveCalculationSagas';
import lookupCompanySagas from '@lookup/store/sagas/lookupCompanySagas';
import lookupCustomerSagas from '@lookup/store/sagas/lookupCustomerSagas';
import lookupDiemSagas from '@lookup/store/sagas/lookupDiemSagas';
import lookupHolidaySagas from '@lookup/store/sagas/lookupHolidaySagas';
import lookupLeaveSagas from '@lookup/store/sagas/lookupLeaveSagas';
import lookupRoleSagas from '@lookup/store/sagas/lookupRoleSagas';
import lookupMenuSagas from '@lookup/store/sagas/menuSagas';
import lookupMileageExceptionSagas from '@lookup/store/sagas/mileageExceptionSagas';
import lookupPositionSagas from '@lookup/store/sagas/positionSagas';
import lookupSystemLimitSagas from '@lookup/store/sagas/systemLimitSagas';
import mileageApprovalSagas from '@mileage/store/sagas/approval/mileageApprovalSagas';
import mileageRequestSagas from '@mileage/store/sagas/request/mileageRequestSagas';
import organizationHierarchySagas from '@organization/store/sagas/organizationHierarchySagas';
import organizationStructureSagas from '@organization/store/sagas/organizationStructureSagas';
import organizationWorkflowSagas from '@organization/store/sagas/organizationWorkflowSagas';
import projectAcceptanceSagas from '@project/store/sagas/projectAcceptanceSagas';
import projectApprovalSagas from '@project/store/sagas/projectApprovalSagas';
import projectAssignmentSagas from '@project/store/sagas/projectAssignmentSagas';
import projectOwnerSagas from '@project/store/sagas/projectOwnerSagas';
import projectRegistrationSagas from '@project/store/sagas/projectRegistrationSagas';
import projectSiteSagas from '@project/store/sagas/projectSiteSagas';
import projectStatusSagas from '@project/store/sagas/projectStatusSagas';
import purchaseSagas from '@purchase/store/sagas/purchaseSagas';
import summarySagas from '@summary/store/sagas/summarySagas';
import timesheetApprovalHistorySagas from '@timesheet/store/sagas/timesheetApprovalHistorySagas';
import timesheetApprovalSagas from '@timesheet/store/sagas/timesheetApprovalSagas';
import timesheetEntrySagas from '@timesheet/store/sagas/timesheetEntrySagas';
import timesheetMileagesSagas from '@timesheet/store/sagas/timesheetMileagesSagas';
import travelApprovalSagas from '@travel/store/sagas/travelApprovalSagas';
import travelSagas from '@travel/store/sagas/travelSagas';
import travelSettlementApprovalSagas from '@travel/store/sagas/travelSettlementApprovalSagas';
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
    fork(commonDestinationSagas),
    fork(commonPurposeSagas),
    fork(commonTransportationSagas),
    fork(commonLimiterSagas),
    fork(commonSystemSagas),
    fork(commonUnitSagas),
    fork(commonGradeSagas),
    fork(commonRelationSagas),
    fork(commonReligionSagas),
    fork(commonGenderSagas),
    fork(commonBloodSagas),
    fork(commonTaxSagas),
    fork(commonEmploymentSagas),
    fork(commonPaymentSagas),
    fork(commonFinanceSagas),
    fork(commonTrainingSagas),
    fork(commonCertificationSagas),
    fork(commonDegreeSagas),
    fork(commonDepartmentSagas),
    fork(commonFamilySagas),
    fork(commonLevelSagas),

    // lookup
    fork(leaveCalculationSagas),
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

    // organization
    fork(organizationHierarchySagas),
    fork(organizationStructureSagas),
    fork(organizationWorkflowSagas),
    
    // account
    fork(accountEmployeeSagas),
    fork(accountEmployeeMySagas),
    fork(accountEmployeeLeaveSagas),
    fork(accountEmployeeAccessHistorySagas),
    fork(accountEmployeeEducationSagas),
    fork(accountEmployeeExperienceSagas),
    fork(accountEmployeeFamilySagas),
    fork(accountEmployeeTrainingSagas),
    fork(accountEmployeeRateSagas),
    fork(accountEmployeeNoteSagas),

    // project
    fork(projectRegistrationSagas),
    fork(projectOwnerSagas),
    fork(projectStatusSagas),
    fork(projectSiteSagas),
    fork(projectApprovalSagas),
    fork(projectAssignmentSagas),
    fork(projectAcceptanceSagas),
    
    // timesheet
    fork(timesheetEntrySagas),
    fork(timesheetApprovalSagas),
    fork(timesheetMileagesSagas),
    fork(timesheetApprovalHistorySagas),
    
    // mileage
    fork(mileageApprovalSagas),
    fork(mileageRequestSagas),

    // expense
    fork(expenseSagas),
    fork(expenseApprovalSagas),
    
    // travel
    fork(travelSagas),
    fork(travelSettlementSagas),
    fork(travelApprovalSagas),
    fork(travelSettlementApprovalSagas),
    
    // purchase
    fork(purchaseSagas),
    
    // finance
    fork(financeSagas),
    
    // leave
    fork(leaveRequestSagas),
    fork(leaveApprovalSagas),
    fork(leaveCancellationSagas),

    // summary
    fork(summarySagas),

    // home
    fork(chartSagas),

    // layout
    fork(landingPageSagas)
  ]);
}