import { accountEmployeeRateGetAllReducer } from './accountEmployeeRateGetAllReducer';
import { accountEmployeeRateGetByIdReducer } from './accountEmployeeRateGetByIdReducer';
import { accountEmployeeRateGetListReducer } from './accountEmployeeRateGetListReducer';
import { accountEmployeeRatePutReducer } from './accountEmployeeRatePutReducer';

const accountEmployeeRateReducers = {
  accountEmployeeRateGetAll: accountEmployeeRateGetAllReducer,
  accountEmployeeRateGetList: accountEmployeeRateGetListReducer,
  accountEmployeeRateGetById: accountEmployeeRateGetByIdReducer,
  accountEmployeeRatePut: accountEmployeeRatePutReducer,
};

export default accountEmployeeRateReducers;