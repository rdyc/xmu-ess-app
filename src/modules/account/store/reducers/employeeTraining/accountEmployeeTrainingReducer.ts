import { accountEmployeeTrainingDeleteReducer } from './accountEmployeeTrainingDeleteReducer';
import { accountEmployeeTrainingGetAllReducer } from './accountEmployeeTrainingGetAllReducer';
import { accountEmployeeTrainingGetByIdReducer } from './accountEmployeeTrainingGetByIdReducer';
import { accountEmployeeTrainingGetListReducer } from './accountEmployeeTrainingGetListReducer';
import { accountEmployeeTrainingPostReducer } from './accountEmployeeTrainingPostReducer';
import { accountEmployeeTrainingPutReducer } from './accountEmployeeTrainingPutReducer';

const accountEmployeeTrainingReducers = {
  accountEmployeeTrainingGetAll: accountEmployeeTrainingGetAllReducer,
  accountEmployeeTrainingGetList: accountEmployeeTrainingGetListReducer,
  accountEmployeeTrainingGetById: accountEmployeeTrainingGetByIdReducer,
  accountEmployeeTrainingPost: accountEmployeeTrainingPostReducer,
  accountEmployeeTrainingPut: accountEmployeeTrainingPutReducer,
  accountEmployeeTrainingDelete: accountEmployeeTrainingDeleteReducer
};

export default accountEmployeeTrainingReducers;