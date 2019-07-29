import {
  kpiTemplateGetAllReducer,
  kpiTemplateGetByIdReducer,
  kpiTemplatePostReducer,
  kpiTemplatePutReducer
} from '@kpi/store/reducers/template';

const kpiTemplateReducers = {
  kpiTemplateGetAll: kpiTemplateGetAllReducer,
  kpiTemplateGetById: kpiTemplateGetByIdReducer,
  kpiTemplatePost: kpiTemplatePostReducer,
  kpiTemplatePut: kpiTemplatePutReducer
};

export default kpiTemplateReducers;