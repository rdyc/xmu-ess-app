import { employeeProfileCommandReducer, employeeProfileQueryReducer } from '@account/store/reducers';

import accountEmployeeReducers from './employee/accountEmployeeReducers';

const accountReducers = {
  profileQuery: employeeProfileQueryReducer,
  profileCommand: employeeProfileCommandReducer,
  ...accountEmployeeReducers
};

export default accountReducers;