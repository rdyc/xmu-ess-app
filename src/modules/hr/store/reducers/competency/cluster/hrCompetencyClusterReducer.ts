import { hrCompetencyClusterDeleteReducer } from './hrCompetencyClusterDeleteReducer';
import { hrCompetencyClusterGetAllReducer } from './hrCompetencyClusterGetAllReducer';
import { hrCompetencyClusterGetDetailReducer } from './hrCompetencyClusterGetDetailReducer';
import { hrCompetencyClusterGetListReducer } from './hrCompetencyClusterGetListReducer';
import { hrCompetencyClusterPatchReducer } from './hrCompetencyClusterPatchReducer';
import { hrCompetencyClusterPostReducer } from './hrCompetencyClusterPostReducer';

export const hrCompetencyClusterReducers = {
  hrCompetencyClusterGetAll: hrCompetencyClusterGetAllReducer,
  hrCompetencyClusterGetList: hrCompetencyClusterGetListReducer,
  hrCompetencyClusterGetById: hrCompetencyClusterGetDetailReducer,
  hrCompetencyClusterPost: hrCompetencyClusterPostReducer,
  hrCompetencyClusterPatch: hrCompetencyClusterPatchReducer,
  hrCompetencyClusterDelete: hrCompetencyClusterDeleteReducer
};