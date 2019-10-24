import {
  kpiTemplateGetAllReducer,
  kpiTemplateGetByIdReducer,
  kpiTemplateGetListReducer,
  kpiTemplatePostReducer,
  kpiTemplatePutReducer
} from '@kpi/store/reducers/template';

const kpiTemplateReducers = {
  kpiTemplateGetAll: kpiTemplateGetAllReducer,
  kpiTemplateGetList: kpiTemplateGetListReducer,
  kpiTemplateGetById: kpiTemplateGetByIdReducer,
  kpiTemplatePost: kpiTemplatePostReducer,
  kpiTemplatePut: kpiTemplatePutReducer
};

export default kpiTemplateReducers;