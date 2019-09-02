import kpiAssignReducers from './assign/kpiAssignReducers';
import kpiCategoryReducers from './category/kpiCategoryReducers';
import kpiEmployeeReducers from './employee/kpiEmployeeReducers';
import kpiMeasurementReducers from './measurement/kpiMeasurementReducers';
import kpiTemplateReducers from './template/kpiTemplateReducers';

export const kpiReducers = {
  ...kpiCategoryReducers,
  ...kpiTemplateReducers,
  ...kpiMeasurementReducers,
  ...kpiEmployeeReducers,
  ...kpiAssignReducers,
};