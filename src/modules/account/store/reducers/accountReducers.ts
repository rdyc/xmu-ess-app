import accountEmployeeReducers from './employee/accountEmployeeReducers';
import accountEmployeeAccessHistoryReducers from './employeeAccessHistory/accountEmployeeAccessHistoryReducer';
import accountEmployeeLeaveReducers from './employeeLeave/accountEmployeeLeaveReducers';
import accountEmployeeMyReducers from './employeeMy/accountEmployeeMyReducers';

const accountReducers = {
  ...accountEmployeeReducers,
  ...accountEmployeeMyReducers,
  ...accountEmployeeLeaveReducers,
  ...accountEmployeeAccessHistoryReducers
};

export default accountReducers;