import accountEmployeeReducers from './employee/accountEmployeeReducers';
import accountEmployeeAccessReducers from './employeeAccess/accountEmployeeAccessReducers';
import accountEmployeeAccessHistoryReducers from './employeeAccessHistory/accountEmployeeAccessHistoryReducer';
import accountEmployeeContractReducers from './employeeContract/accountEmployeeContractReducer';
import accountEmployeeEducationReducers from './employeeEducation/accountEmployeeEducationReducer';
import accountEmployeeExperienceReducers from './employeeExperience/accountEmployeeExperienceReducer';
import accountEmployeeFamilyReducers from './employeeFamily/accountEmployeeFamilyReducer';
import accountEmployeeKPIReducers from './employeeKPI/accountEmployeeKPIReducers';
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
  ...accountEmployeeNoteReducers,
  ...accountEmployeeAccessReducers,
  ...accountEmployeeContractReducers,
  ...accountEmployeeKPIReducers,
};

export default accountReducers;