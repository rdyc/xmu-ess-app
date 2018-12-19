import { accountEmployeeExperienceDeleteReducer } from './accountEmployeeExperienceDeleteReducer';
import { accountEmployeeExperienceGetAllReducer } from './accountEmployeeExperienceGetAllReducer';
import { accountEmployeeExperienceGetByIdReducer } from './accountEmployeeExperienceGetByIdReducer';
import { accountEmployeeExperienceGetListReducer } from './accountEmployeeExperienceGetListReducer';
import { accountEmployeeExperiencePostReducer } from './accountEmployeeExperiencePostReducer';
import { accountEmployeeExperiencePutReducer } from './accountEmployeeExperiencePutReducer';

const accountEmployeeExperienceReducers = {
  accountEmployeeExperienceGetAll: accountEmployeeExperienceGetAllReducer,
  accountEmployeeExperienceGetList: accountEmployeeExperienceGetListReducer,
  accountEmployeeExperienceGetById: accountEmployeeExperienceGetByIdReducer,
  accountEmployeeExperiencePost: accountEmployeeExperiencePostReducer,
  accountEmployeeExperiencePut: accountEmployeeExperiencePutReducer,
  accountEmployeeExperienceDelete: accountEmployeeExperienceDeleteReducer
};

export default accountEmployeeExperienceReducers;