import {
  employeeGetAllReducer,
  employeeGetByIdReducer,
  employeeGetListReducer,
  employeeProfileCommandReducer,
  employeeProfileQueryReducer,
} from '@account/store/reducers';

const accountReducers = {
  profileQuery: employeeProfileQueryReducer,
  profileCommand: employeeProfileCommandReducer,

  employeeGetAll: employeeGetAllReducer,
  employeeGetList: employeeGetListReducer,
  employeeGetById: employeeGetByIdReducer,
};

export default accountReducers;