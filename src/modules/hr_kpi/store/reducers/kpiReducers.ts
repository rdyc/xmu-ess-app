import kpiCategoryReducers from './category/kpiCategoryReducers';
import employeeKPIReducers from './employee/employeeKPIReducers';
import kpiMeasurementReducers from './measurement/kpiMeasurementReducers';
import kpiTemplateReducers from './template/kpiTemplateReducers';

export const kpiReducers = {
  ...kpiCategoryReducers,
  ...kpiTemplateReducers,
  ...kpiMeasurementReducers,
  ...employeeKPIReducers,
};