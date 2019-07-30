import kpiCategoryReducers from './category/kpiCategoryReducers';
import kpiMeasurementReducers from './measurement/kpiMeasurementReducers';
import kpiTemplateReducers from './template/kpiTemplateReducers';

export const kpiReducers = {
  ...kpiCategoryReducers,
  ...kpiTemplateReducers,
  ...kpiMeasurementReducers
};