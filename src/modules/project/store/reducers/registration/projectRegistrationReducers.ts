import {
  projectRegistrationGetAllReducer,
  projectRegistrationGetByIdReducer,
  projectRegistrationGetListReducer,
  projectRegistrationPatchReducer,
  projectRegistrationPostReducer,
  projectRegistrationPutReducer,
} from '@project/store/reducers/registration';

const projectRegistrationReducers = {
  projectRegistrationGetAll: projectRegistrationGetAllReducer,
  projectRegistrationGetList: projectRegistrationGetListReducer,
  projectRegistrationGetById: projectRegistrationGetByIdReducer,
  projectRegistrationPost: projectRegistrationPostReducer,
  projectRegistrationPut: projectRegistrationPutReducer,
  projectRegistrationPatch: projectRegistrationPatchReducer,
};

export default projectRegistrationReducers;