import accountEmployeeReducers from './employee/accountEmployeeReducers';
import accountEmployeeAccessHistoryReducers from './employeeAccessHistory/accountEmployeeAccessHistoryReducer';
import accountEmployeeEducationReducers from './employeeEducation/accountEmployeeEducationReducer';
import accountEmployeeExperienceReducers from './employeeExperience/accountEmployeeExperienceReducer';
import accountEmployeeFamilyReducers from './employeeFamily/accountEmployeeFamilyReducer';
import accountEmployeeLeaveReducers from './employeeLeave/accountEmployeeLeaveReducers';
import accountEmployeeMyReducers from './employeeMy/accountEmployeeMyReducers';
import accountEmployeeNoteReducers from './employeeNote/accountEmployeeNoteReducer';
import accountEmployeeRateReducers from './employeeRate/accountEmployeeRateReducer';
import accountEmployeeTrainingReducers from './employeeTraining/accountEmployeeTrainingReducer';

const accountReducers = {
  ...accountEmployeeReducers,
  ...accountEmployeeMyReducers,
  ...accountEmployeeLeaveReducers,
  ...accountEmployeeAccessHistoryReducers,
  ...accountEmployeeEducationReducers,
  ...accountEmployeeExperienceReducers,
  ...accountEmployeeFamilyReducers,
  ...accountEmployeeTrainingReducers,
  ...accountEmployeeRateReducers,
  ...accountEmployeeNoteReducers
};

export default accountReducers;