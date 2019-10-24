import accountEmployeeAccessHistorySagas from '@account/store/sagas/accountEmployeeAccessHistorySagas';
import accountEmployeeAccessSagas from '@account/store/sagas/accountEmployeeAccessSagas';
import accountEmployeeContractSagas from '@account/store/sagas/accountEmployeeContractSagas';
import accountEmployeeEducationSagas from '@account/store/sagas/accountEmployeeEducationSagas';
import accountEmployeeExperienceSagas from '@account/store/sagas/accountEmployeeExperienceSagas';
import accountEmployeeFamilySagas from '@account/store/sagas/accountEmployeeFamilySagas';
import accountEmployeeKPISagas from '@account/store/sagas/accountEmployeeKPISagas';
import accountEmployeeLeaveSagas from '@account/store/sagas/accountEmployeeLeaveSagas';
import accountEmployeeMySagas from '@account/store/sagas/accountEmployeeMySagas';
import accountEmployeeNoteSagas from '@account/store/sagas/accountEmployeeNoteSagas';
import accountEmployeeRateSagas from '@account/store/sagas/accountEmployeeRateSagas';
import accountEmployeeSagas from '@account/store/sagas/accountEmployeeSagas';
import accountEmployeeTrainingSagas from '@account/store/sagas/accountEmployeeTrainingSagas';
import commonActivitySagas from '@common/store/sagas/activitySagas';
import commonBloodSagas from '@common/store/sagas/bloodSagas';
import commonCertificationSagas from '@common/store/sagas/certificationSagas';
import commonCompetencySagas from '@common/store/sagas/competencySagas';
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
import commonKpiSagas from '@common/store/sagas/kpiSagas';
import commonLeaveSagas from '@common/store/sagas/leaveSagas';
import commonLevelSagas from '@common/store/sagas/levelSagas';
import commonLimiterSagas from '@common/store/sagas/limiterSagas';
import commonMeasurementSagas from '@common/store/sagas/measurementSagas';
import commonPaymentSagas from '@common/store/sagas/paymentSagas';
import commonProfessionSagas from '@common/store/sagas/professionSagas';
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
import achievementSagas from '@home/store/sagas/achievementSagas';
import announcementSagas from '@home/store/sagas/announcementSagas';
import newsFeedSagas from '@home/store/sagas/newsFeedSagas';
import notifPeriodSagas from '@hr.notification/store/sagas/notifPeriodSagas';
import notifSettingSagas from '@hr.notification/store/sagas/notifSettingSagas';
import notifTemplateSagas from '@hr.notification/store/sagas/notifTemplateSagas';
import hrCompetencyAssessmentSagas from '@hr/store/sagas/competency/assessment/hrCompetencyAssessmentSagas';
import hrCompetencyCategorySagas from '@hr/store/sagas/competency/category/hrCompetencyCategorySagas';
import hrCompetencyClusterSagas from '@hr/store/sagas/competency/cluster/hrCompetencyClusterSagas';
import hrCompetencyEmployeeSagas from '@hr/store/sagas/competency/employee/hrCompetencyEmployeeSagas';
import hrCompetencyIndicatorSagas from '@hr/store/sagas/competency/indicator/hrCompetencyIndicatorSagas';
import hrCompetencyLevelSagas from '@hr/store/sagas/competency/level/hrCompetencyLevelSagas';
import hrCompetencyMappedSagas from '@hr/store/sagas/competency/mapped/hrCompetencyMappedSagas';
import hrCompetencyResultSagas from '@hr/store/sagas/competency/result/hrCompetencyResultSagas';
import hrCornerBlogSagas from '@hr/store/sagas/corner/blog/hrCornerBlogSagas';
import hrCornerCategorySagas from '@hr/store/sagas/corner/category/hrCornerCategorySagas';
import hrCornerPageSagas from '@hr/store/sagas/corner/page/hrCornerPageSagas';
import inforSagas from '@infor/store/sagas/inforSagas';
import kpiApprovalSagas from '@kpi/store/sagas/kpiApprovalSagas';
import kpiAssignSagas from '@kpi/store/sagas/kpiAssignSagas';
import kpiCategorySagas from '@kpi/store/sagas/kpiCategorySagas';
import kpiEmployeeSagas from '@kpi/store/sagas/kpiEmployeeSagas';
import kpiMeasurementSagas from '@kpi/store/sagas/kpiMeasurementSagas';
import kpiTemplateSagas from '@kpi/store/sagas/kpiTemplateSagas';
import commonNotificationSagas from '@layout/store/sagas/notificationSagas';
import leaveApprovalSagas from '@leave/store/sagas/leaveApprovalSagas';
import leaveCancellationSagas from '@leave/store/sagas/leaveCancellationSagas';
import leaveRequestSagas from '@leave/store/sagas/leaveRequestSagas';
import lookupAchievementSagas from '@lookup/store/sagas/lookupAchievementSagas';
import lookupCompanySagas from '@lookup/store/sagas/lookupCompanySagas';
import lookupCurrencySagas from '@lookup/store/sagas/lookupCurrencySagas';
import lookupCustomerSagas from '@lookup/store/sagas/lookupCustomerSagas';
import lookupDiemSagas from '@lookup/store/sagas/lookupDiemSagas';
import lookupEmployeeLevelSagas from '@lookup/store/sagas/lookupEmployeeLevelSagas';
import lookupHolidaySagas from '@lookup/store/sagas/lookupHolidaySagas';
import lookupImageGallerySagas from '@lookup/store/sagas/lookupImageGallerySagas';
import lookupLeaveCalculationSagas from '@lookup/store/sagas/lookupLeaveCalculationSagas';
import lookupLeaveSagas from '@lookup/store/sagas/lookupLeaveSagas';
import lookupMenuSagas from '@lookup/store/sagas/lookupMenuSagas';
import lookupMileageExceptionSagas from '@lookup/store/sagas/lookupMileageExceptionSagas';
import lookupPositionSagas from '@lookup/store/sagas/lookupPositionSagas';
import lookupRoleSagas from '@lookup/store/sagas/lookupRoleSagas';
import lookupSystemLimitSagas from '@lookup/store/sagas/lookupSystemLimitSagas';
import lookupVersionSagas from '@lookup/store/sagas/lookupVersionSagas';
import mileageApprovalSagas from '@mileage/store/sagas/approval/mileageApprovalSagas';
import mileageRequestSagas from '@mileage/store/sagas/request/mileageRequestSagas';
import organizationHierarchySagas from '@organization/store/sagas/organizationHierarchySagas';
import organizationStructureSagas from '@organization/store/sagas/organizationStructureSagas';
import organizationWorkflowSagas from '@organization/store/sagas/organizationWorkflowSagas';
import employeeFinalSagas from '@profile/store/sagas/employeeFinalSagas';
import projectAcceptanceSagas from '@project/store/sagas/projectAcceptanceSagas';
import projectAdministrationSagas from '@project/store/sagas/projectAdministrationSagas';
import projectApprovalSagas from '@project/store/sagas/projectApprovalSagas';
import projectAssignmentSagas from '@project/store/sagas/projectAssignmentSagas';
import projectHourSagas from '@project/store/sagas/projectHourSagas';
import projectOwnerSagas from '@project/store/sagas/projectOwnerSagas';
import projectRegistrationSagas from '@project/store/sagas/projectRegistrationSagas';
import projectSiteSagas from '@project/store/sagas/projectSiteSagas';
import projectStatusSagas from '@project/store/sagas/projectStatusSagas';
import purchaseApprovalSagas from '@purchase/store/sagas/purchaseApprovalSagas';
import purchaseRequestSagas from '@purchase/store/sagas/purchaseRequestSagas';
import purchaseSettlementApprovalSagas from '@purchase/store/sagas/purchaseSettlementApprovalSagas';
import purchaseSettlementSagas from '@purchase/store/sagas/purchaseSettlementSagas';
import summarySagas from '@summary/store/sagas/summarySagas';
import timesheetApprovalHistorySagas from '@timesheet/store/sagas/timesheetApprovalHistorySagas';
import timesheetApprovalSagas from '@timesheet/store/sagas/timesheetApprovalSagas';
import timesheetEntrySagas from '@timesheet/store/sagas/timesheetEntrySagas';
import timesheetMileagesSagas from '@timesheet/store/sagas/timesheetMileagesSagas';
import travelApprovalSagas from '@travel/store/sagas/travelApprovalSagas';
import travelSagas from '@travel/store/sagas/travelSagas';
import travelSettlementApprovalSagas from '@travel/store/sagas/travelSettlementApprovalSagas';
import travelSettlementSagas from '@travel/store/sagas/travelSettlementSagas';
import webJobDefinitionSagas from '@webjob/store/sagas/definition/webJobDefinitionSagas';
import webJobMonitoringSagas from '@webjob/store/sagas/monitoring/webJobMonitoringSagas';
import webJobRecurringSagas from '@webjob/store/sagas/recurring/webJobRecurringSagas';
import markdownCategorySagas from 'playground/markdown/store/sagas/markdownCategorySagas';
import markdownSagas from 'playground/markdown/store/sagas/markdownSagas';
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
    fork(commonCompetencySagas),
    fork(commonProfessionSagas),
    fork(commonKpiSagas),
    fork(commonMeasurementSagas),

    // lookup
    fork(lookupLeaveCalculationSagas),
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
    fork(lookupAchievementSagas),
    fork(lookupEmployeeLevelSagas),

    fork(lookupVersionSagas),
    fork(lookupImageGallerySagas),
    
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
    fork(accountEmployeeAccessSagas),
    fork(accountEmployeeContractSagas),
    fork(accountEmployeeKPISagas),

    // project
    fork(projectRegistrationSagas),
    fork(projectOwnerSagas),
    fork(projectHourSagas),
    fork(projectStatusSagas),
    fork(projectSiteSagas),
    fork(projectApprovalSagas),
    fork(projectAssignmentSagas),
    fork(projectAcceptanceSagas),
    fork(projectAdministrationSagas),
    
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
    fork(purchaseRequestSagas),
    fork(purchaseSettlementSagas),
    fork(purchaseApprovalSagas),
    fork(purchaseSettlementApprovalSagas),
    
    // finance
    fork(financeSagas),
    
    // leave
    fork(leaveRequestSagas),
    fork(leaveApprovalSagas),
    fork(leaveCancellationSagas),

    // summary
    fork(summarySagas),

    // infor
    fork(inforSagas),

    // home
    fork(achievementSagas),
    fork(announcementSagas),
    fork(newsFeedSagas),

    // hr notificationSagas
    fork(notifPeriodSagas),
    fork(notifSettingSagas),
    fork(notifTemplateSagas),

    // markdown
    fork(markdownSagas),
    fork(markdownCategorySagas),
    
    // competency
    fork(hrCompetencyCategorySagas),
    fork(hrCompetencyClusterSagas),
    fork(hrCompetencyIndicatorSagas),
    fork(hrCompetencyLevelSagas),
    fork(hrCompetencyMappedSagas),
    fork(hrCompetencyAssessmentSagas),
    fork(hrCompetencyEmployeeSagas),
    fork(hrCompetencyResultSagas),

    // kpi
    fork(kpiTemplateSagas),
    fork(kpiCategorySagas),
    fork(kpiMeasurementSagas),
    fork(kpiEmployeeSagas),
    fork(kpiApprovalSagas),
    fork(kpiAssignSagas),

    // corner
    fork(hrCornerBlogSagas),
    fork(hrCornerCategorySagas),
    fork(hrCornerPageSagas),

    // employee final
    fork(employeeFinalSagas),

    // web job
    fork(webJobMonitoringSagas),
    fork(webJobRecurringSagas),
    fork(webJobDefinitionSagas)
  ]);
}