import { 
  customerGetAllReducer, 
  customerGetByIdReducer, 
  customerGetListReducer, 
  
  menuGetAllReducer, 
  menuGetByIdReducer, 
  menuGetListReducer, 
  
  positionGetAllReducer, 
  positionGetByIdReducer, 
  positionGetListReducer, 
  positionPostReducer, 
  positionPutReducer } from '@lookup/store/reducers';

const lookupReducers = {
  customerGetAll: customerGetAllReducer,
  customerGetList: customerGetListReducer,
  customerGetById: customerGetByIdReducer,
  
  menuGetAll: menuGetAllReducer,
  menuGetById: menuGetByIdReducer,
  menuGetList: menuGetListReducer,

  positionGetAll: positionGetAllReducer,
  positionGetById: positionGetByIdReducer,
  positionGetList: positionGetListReducer,
  positionPost: positionPostReducer,
  positionPut: positionPutReducer
};

export default lookupReducers;