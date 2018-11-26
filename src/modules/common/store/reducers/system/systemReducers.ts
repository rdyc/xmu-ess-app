import { systemGetAllReducer, systemGetByIdReducer, systemGetListReducer, systemGetTypeReducer } from '@common/store/reducers/system';

const systemReducers = {
  commonAll: systemGetAllReducer,
  commonList: systemGetListReducer,
  commonDetail: systemGetByIdReducer,
  commonType: systemGetTypeReducer,
};

export default systemReducers;