import { systemGetAllReducer, systemGetByIdReducer, systemGetListReducer, systemGetTypeReducer } from '@common/store/reducers/system';

const systemReducers = {
  commonSystemAll: systemGetAllReducer,
  commonSystemList: systemGetListReducer,
  commonSystemDetail: systemGetByIdReducer,
  commonSystemType: systemGetTypeReducer,
};

export default systemReducers;