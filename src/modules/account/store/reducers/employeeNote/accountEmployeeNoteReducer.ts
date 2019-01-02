import { accountEmployeeNoteDeleteReducer } from './accountEmployeeNoteDeleteReducer';
import { accountEmployeeNoteGetAllReducer } from './accountEmployeeNoteGetAllReducer';
import { accountEmployeeNoteGetByIdReducer } from './accountEmployeeNoteGetByIdReducer';
import { accountEmployeeNoteGetListReducer } from './accountEmployeeNoteGetListReducer';
import { accountEmployeeNotePostReducer } from './accountEmployeeNotePostReducer';
import { accountEmployeeNotePutReducer } from './accountEmployeeNotePutReducer';

const accountEmployeeNoteReducers = {
  accountEmployeeNoteGetAll: accountEmployeeNoteGetAllReducer,
  accountEmployeeNoteGetList: accountEmployeeNoteGetListReducer,
  accountEmployeeNoteGetById: accountEmployeeNoteGetByIdReducer,
  accountEmployeeNotePost: accountEmployeeNotePostReducer,
  accountEmployeeNotePut: accountEmployeeNotePutReducer,
  accountEmployeeNoteDelete: accountEmployeeNoteDeleteReducer
};

export default accountEmployeeNoteReducers;