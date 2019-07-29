import {
  hrTemplateGetAllReducer,
  hrTemplateGetByIdReducer,
  hrTemplatePostReducer,
  hrTemplatePutReducer
} from '@hr/store/reducers/template';

const hrTemplateReducers = {
  hrTemplateGetAll: hrTemplateGetAllReducer,
  hrTemplateGetById: hrTemplateGetByIdReducer,
  hrTemplatePost: hrTemplatePostReducer,
  hrTemplatePut: hrTemplatePutReducer
};

export default hrTemplateReducers;