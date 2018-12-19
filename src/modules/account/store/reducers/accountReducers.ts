import accountEmployeeReducers from './employee/accountEmployeeReducers';
import accountEmployeeAccessHistoryReducers from './employeeAccessHistory/accountEmployeeAccessHistoryReducer';
import accountEmployeeEducationReducers from './employeeEducation/accountEmployeeEducationReducer';
import accountEmployeeExperienceReducers from './employeeExperience/accountEmployeeExperienceReducer';
import accountEmployeeLeaveReducers from './employeeLeave/accountEmployeeLeaveReducers';
import accountEmployeeMyReducers from './employeeMy/accountEmployeeMyReducers';

const accountReducers = {
  ...accountEmployeeReducers,
  ...accountEmployeeMyReducers,
  ...accountEmployeeLeaveReducers,
  ...accountEmployeeAccessHistoryReducers,
  ...accountEmployeeEducationReducers,
  ...accountEmployeeExperienceReducers
};

export default accountReducers;