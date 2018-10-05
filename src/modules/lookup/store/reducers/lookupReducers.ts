import { customerGetAllReducer, customerGetByIdReducer, customerGetListReducer, currencyGetAllReducer, currencyGetByIdReducer, currencyGetListReducer } from '@lookup/store/reducers';

const lookupReducers = {
  customerGetAll: customerGetAllReducer,
  customerGetList: customerGetListReducer,
  customerGetById: customerGetByIdReducer,
  currencyGetAll: currencyGetAllReducer,
  currencyGetList: currencyGetListReducer,
  currencyGetById: currencyGetByIdReducer
};

export default lookupReducers;