import { customerGetAllReducer, customerGetByIdReducer, customerGetListReducer, 
  currencyGetAllReducer, currencyGetByIdReducer, currencyGetListReducer, 
  systemLimitGetAllReducer, systemLimitGetByIdReducer, systemLimitGetListReducer 
} from '@lookup/store/reducers';

const lookupReducers = {
  customerGetAll: customerGetAllReducer,
  customerGetList: customerGetListReducer,
  customerGetById: customerGetByIdReducer,
  currencyGetAll: currencyGetAllReducer,
  currencyGetList: currencyGetListReducer,
  currencyGetById: currencyGetByIdReducer,
  systemLimitGetAll: systemLimitGetAllReducer,
  systemLimitGetList: systemLimitGetListReducer,
  systemLimitGetById: systemLimitGetByIdReducer
};

export default lookupReducers;