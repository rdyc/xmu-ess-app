import KPIMeasurementReducers from './measurement/KPIMeasurementReducers';
import KPITemplateReducers from './template/KPITemplateReducers';

export const KPIReducers = {
  ...KPITemplateReducers,
  ...KPIMeasurementReducers
};