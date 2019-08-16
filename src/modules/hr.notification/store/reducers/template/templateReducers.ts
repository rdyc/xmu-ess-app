import { 
  templateDeleteReducer, 
  templateGetAllReducer, 
  templateGetByIdReducer, 
  templateGetListReducer, 
  templatePostReducer, 
  templatePutReducer 
} from '@hr.notification/store/reducers/template';

const templateReducers = {
  templateGetAll: templateGetAllReducer,
  templateGetList: templateGetListReducer,
  templateGetById: templateGetByIdReducer,
  templatePost: templatePostReducer,
  templatePut: templatePutReducer,
  templateDelete: templateDeleteReducer,
};

export default templateReducers;