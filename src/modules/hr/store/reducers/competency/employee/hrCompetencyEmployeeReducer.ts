import { hrCompetencyEmployeeGetAllReducer } from './hrCompetencyEmployeeGetAllReducer';
import { hrCompetencyEmployeeGetDetailListReducer } from './hrCompetencyEmployeeGetDetailListReducer';
import { hrCompetencyEmployeeGetDetailReducer } from './hrCompetencyEmployeeGetDetailReducer';
import { hrCompetencyEmployeeGetResultReducer } from './hrCompetencyEmployeeGetResultReducer';
import { hrCompetencyEmployeePatchReducer } from './hrCompetencyEmployeePatchReducer';

export const hrCompetencyEmployeeReducers = {
  hrCompetencyEmployeeGetAll: hrCompetencyEmployeeGetAllReducer,
  hrCompetencyEmployeeGetDetailList: hrCompetencyEmployeeGetDetailListReducer,
  hrCompetencyEmployeeGetById: hrCompetencyEmployeeGetDetailReducer,
  hrCompetencyEmployeePatch: hrCompetencyEmployeePatchReducer,
  hrCompetencyEmployeeGetResult: hrCompetencyEmployeeGetResultReducer
};