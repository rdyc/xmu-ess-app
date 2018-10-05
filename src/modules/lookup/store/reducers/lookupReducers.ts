import { customerGetAllReducer, customerGetByIdReducer, customerGetListReducer, menuGetAllReducer, menuGetByIdReducer, menuGetListReducer } from '@lookup/store/reducers';

const lookupReducers = {
  customerGetAll: customerGetAllReducer,
  customerGetList: customerGetListReducer,
  customerGetById: customerGetByIdReducer,
  
  menuGetAll: menuGetAllReducer,
  menuGetById: menuGetByIdReducer,
  menuGetList: menuGetListReducer
};

export default lookupReducers;