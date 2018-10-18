import {
  projectRegistrationGetAllReducer,
  projectRegistrationGetByIdReducer,
  projectRegistrationGetListReducer,
  projectRegistrationPostReducer,
  projectRegistrationPutReducer,
} from '@project/store/reducers/registration';

const projectRegistrationReducers = {
  projectRegistrationGetAll: projectRegistrationGetAllReducer,
  projectRegistrationGetList: projectRegistrationGetListReducer,
  projectRegistrationGetById: projectRegistrationGetByIdReducer,
  projectRegistrationPost: projectRegistrationPostReducer,
  projectRegistrationPut: projectRegistrationPutReducer,
};

export default projectRegistrationReducers;