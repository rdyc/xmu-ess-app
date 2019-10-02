import kpiApprovalReducers from './approval/kpiApprovalReducers';
import kpiAssignReducers from './assign/kpiAssignReducers';
import kpiCategoryReducers from './category/kpiCategoryReducers';
import kpiEmployeeReducers from './employee/kpiEmployeeReducers';
import employeeKPIReducers from './employeeKPI/employeeKPIReducers';
import kpiFinalReducers from './final/kpiFinalReducers';
import kpiMeasurementReducers from './measurement/kpiMeasurementReducers';
import kpiTemplateReducers from './template/kpiTemplateReducers';

export const kpiReducers = {
  ...kpiCategoryReducers,
  ...kpiTemplateReducers,
  ...kpiMeasurementReducers,
  ...kpiEmployeeReducers,
  ...kpiAssignReducers,
  ...kpiApprovalReducers,
  ...kpiFinalReducers,
  ...employeeKPIReducers,
};