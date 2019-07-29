import {
  KPITemplateGetAllReducer,
  KPITemplateGetByIdReducer,
  KPITemplatePostReducer,
  KPITemplatePutReducer
} from '@KPI/store/reducers/template';

const KPITemplateReducers = {
  KPITemplateGetAll: KPITemplateGetAllReducer,
  KPITemplateGetById: KPITemplateGetByIdReducer,
  KPITemplatePost: KPITemplatePostReducer,
  KPITemplatePut: KPITemplatePutReducer
};

export default KPITemplateReducers;