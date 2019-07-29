import hrMeasurementReducers from './measurement/hrMeasurementReducers';
import hrTemplateReducers from './template/hrTemplateReducers';

export const hrReducers = {
  ...hrTemplateReducers,
  ...hrMeasurementReducers
};