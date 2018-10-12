import { 
  customerGetAllReducer, 
  customerGetByIdReducer, 
  customerGetListReducer,
  diemGetAllReducer, 
  diemGetByIdReducer, 
  diemGetListReducer, 
} from '@lookup/store/reducers';

const lookupReducers = {
  customerGetAll: customerGetAllReducer,
  customerGetList: customerGetListReducer,
  customerGetById: customerGetByIdReducer,
  diemGetAll: diemGetAllReducer,
  diemGetList: diemGetListReducer,
  diemGetById: diemGetByIdReducer,  
};

export default lookupReducers;