import { hrCompetencyCategoryGetAllReducer } from './hrCompetencyCategoryGetAllReducer';
import { hrCompetencyCategoryGetDetailReducer } from './hrCompetencyCategoryGetDetailReducer';
import { hrCompetencyCategoryGetListReducer } from './hrCompetencyCategoryGetListReducer';
import { hrCompetencyCategoryPatchReducer } from './hrCompetencyCategoryPatchReducer';
import { hrCompetencyCategoryPostReducer } from './hrCompetencyCategoryPostReducer';

export const hrCompetencyCategoryReducers = {
  hrCompetencyCategoryGetAll: hrCompetencyCategoryGetAllReducer,
  hrCompetencyCategoryGetList: hrCompetencyCategoryGetListReducer,
  hrCompetencyCategoryGetById: hrCompetencyCategoryGetDetailReducer,
  hrCompetencyCategoryPost: hrCompetencyCategoryPostReducer,
  hrCompetencyCategoryPatch: hrCompetencyCategoryPatchReducer
};