import { 
  notifTemplateDeleteReducer, 
  notifTemplateGetAllReducer, 
  notifTemplateGetByIdReducer, 
  notifTemplateGetListReducer, 
  notifTemplatePostReducer, 
  notifTemplatePutReducer 
} from '@hr.notification/store/reducers/template';

const notifTemplateReducers = {
  templateGetAll: notifTemplateGetAllReducer,
  templateGetList: notifTemplateGetListReducer,
  templateGetById: notifTemplateGetByIdReducer,
  templatePost: notifTemplatePostReducer,
  templatePut: notifTemplatePutReducer,
  templateDelete: notifTemplateDeleteReducer,
};

export default notifTemplateReducers;