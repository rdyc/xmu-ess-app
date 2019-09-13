import { hrCompetencyResultGetAllReducer } from './hrCompetencyResultGetAllReducer';
import { hrCompetencyResultGetDetailListReducer } from './hrCompetencyResultGetDetailListReducer';
import { hrCompetencyResultGetDetailReducer } from './hrCompetencyResultGetDetailReducer';
import { hrCompetencyResultGetListReducer } from './hrCompetencyResultGetListReducer';
import { hrCompetencyResultPatchReducer } from './hrCompetencyResultPatchReducer';
import { hrCompetencyResultPostReducer } from './hrCompetencyResultPostReducer';

export const hrCompetencyResultReducers = {
  hrCompetencyResultGetAll: hrCompetencyResultGetAllReducer,
  hrCompetencyResultGetList: hrCompetencyResultGetListReducer,
  hrCompetencyResultGetDetailList: hrCompetencyResultGetDetailListReducer,
  hrCompetencyResultGetById: hrCompetencyResultGetDetailReducer,
  hrCompetencyResultPost: hrCompetencyResultPostReducer,
  hrCompetencyResultPatch: hrCompetencyResultPatchReducer
};