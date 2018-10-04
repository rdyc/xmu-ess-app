import { customerGetAllReducer, customerGetByIdReducer, customerGetListReducer } from '@lookup/store/reducers';

const lookupReducers = {
  customerGetAll: customerGetAllReducer,
  customerGetList: customerGetListReducer,
  customerGetById: customerGetByIdReducer
};

export default lookupReducers;