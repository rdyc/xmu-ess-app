import {
  companyGetAllReducer,
  companyGetByIdReducer,
  companyGetListReducer,

  customerGetAllReducer,
  customerGetByIdReducer,
  customerGetListReducer,

  roleGetAllReducer,
  roleGetByIdReducer,
  roleGetListReducer
} from '@lookup/store/reducers';

const lookupReducers = {
  customerGetAll: customerGetAllReducer,
  customerGetList: customerGetListReducer,
  customerGetById: customerGetByIdReducer,

  roleGetAll: roleGetAllReducer,
  roleGetList: roleGetListReducer,
  roleGetById: roleGetByIdReducer,

  companyGetAll: companyGetAllReducer,
  companyGetList: companyGetListReducer,
  companyGetById: companyGetByIdReducer,
};

export default lookupReducers;