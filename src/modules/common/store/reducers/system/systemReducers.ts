import { systemGetAllReducer, systemGetByIdReducer, systemGetListReducer, systemGetTypeReducer, systemPostReducer, systemPutReducer } from '@common/store/reducers/system';

const systemReducers = {
  commonSystemAll: systemGetAllReducer,
  commonSystemList: systemGetListReducer,
  commonSystemDetail: systemGetByIdReducer,
  commonSystemType: systemGetTypeReducer,
  commonSystemPost: systemPostReducer,
  commonSystemPut: systemPutReducer,
};

export default systemReducers;