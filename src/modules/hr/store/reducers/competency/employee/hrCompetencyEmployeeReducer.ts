import { hrCompetencyEmployeeGetAllReducer } from './hrCompetencyEmployeeGetAllReducer';
import { hrCompetencyEmployeeGetDetailReducer } from './hrCompetencyEmployeeGetDetailReducer';
import { hrCompetencyEmployeePatchReducer } from './hrCompetencyEmployeePatchReducer';
import { hrCompetencyEmployeePostReducer } from './hrCompetencyEmployeePostReducer';

export const hrCompetencyEmployeeReducers = {
  hrCompetencyEmployeeGetAll: hrCompetencyEmployeeGetAllReducer,
  hrCompetencyEmployeeGetById: hrCompetencyEmployeeGetDetailReducer,
  hrCompetencyEmployeePost: hrCompetencyEmployeePostReducer,
  hrCompetencyEmployeePatch: hrCompetencyEmployeePatchReducer
};