import { hrCompetencyEmployeeGetAllReducer } from './hrCompetencyEmployeeGetAllReducer';
import { hrCompetencyEmployeeGetDetailListReducer } from './hrCompetencyEmployeeGetDetailListReducer';
import { hrCompetencyEmployeeGetDetailReducer } from './hrCompetencyEmployeeGetDetailReducer';
import { hrCompetencyEmployeeGetListReducer } from './hrCompetencyEmployeeGetListReducer';
import { hrCompetencyEmployeePatchReducer } from './hrCompetencyEmployeePatchReducer';
import { hrCompetencyEmployeePostReducer } from './hrCompetencyEmployeePostReducer';

export const hrCompetencyEmployeeReducers = {
  hrCompetencyEmployeeGetAll: hrCompetencyEmployeeGetAllReducer,
  hrCompetencyEmployeeGetList: hrCompetencyEmployeeGetListReducer,
  hrCompetencyEmployeeGetDetailList: hrCompetencyEmployeeGetDetailListReducer,
  hrCompetencyEmployeeGetById: hrCompetencyEmployeeGetDetailReducer,
  hrCompetencyEmployeePost: hrCompetencyEmployeePostReducer,
  hrCompetencyEmployeePatch: hrCompetencyEmployeePatchReducer
};