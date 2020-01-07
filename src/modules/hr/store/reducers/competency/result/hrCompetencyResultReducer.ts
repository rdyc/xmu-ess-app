import { hrCompetencyResultGetAllReducer } from './hrCompetencyResultGetAllReducer';
import { hrCompetencyResultGetDetailListReducer } from './hrCompetencyResultGetDetailListReducer';
import { hrCompetencyResultGetDetailReducer } from './hrCompetencyResultGetDetailReducer';
import { hrCompetencyResultPatchReducer } from './hrCompetencyResultPatchReducer';

export const hrCompetencyResultReducers = {
  hrCompetencyResultGetAll: hrCompetencyResultGetAllReducer,
  hrCompetencyResultGetDetailList: hrCompetencyResultGetDetailListReducer,
  hrCompetencyResultGetById: hrCompetencyResultGetDetailReducer,
  hrCompetencyResultPatch: hrCompetencyResultPatchReducer
};