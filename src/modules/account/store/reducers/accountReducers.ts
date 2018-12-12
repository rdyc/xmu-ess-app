import accountEmployeeReducers from './employee/accountEmployeeReducers';
import accountEmployeeAccessReducers from './employeeAccess/accountEmployeeAccessReducers';
import accountEmployeeLeaveReducers from './employeeLeave/accountEmployeeLeaveReducers';
import accountEmployeeMyReducers from './employeeMy/accountEmployeeMyReducers';

const accountReducers = {
  ...accountEmployeeReducers,
  ...accountEmployeeMyReducers,
  ...accountEmployeeLeaveReducers,
  ...accountEmployeeAccessReducers
};

export default accountReducers;