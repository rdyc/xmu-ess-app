import { currencyGetAllReducer, currencyGetByIdReducer, currencyGetListReducer, 
  customerGetAllReducer, customerGetByIdReducer, customerGetListReducer, 
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