import { hrCompetencyClusterGetAllReducer } from './hrCompetencyClusterGetAllReducer';
import { hrCompetencyClusterGetDetailReducer } from './hrCompetencyClusterGetDetailReducer';
import { hrCompetencyClusterGetListReducer } from './hrCompetencyClusterGetListReducer';
import { hrCompetencyClusterPostReducer } from './hrCompetencyClusterPostReducer';
import { hrCompetencyClusterPutReducer } from './hrCompetencyClusterPutReducer';

export const hrCompetencyClusterReducers = {
  hrCompetencyClusterGetAll: hrCompetencyClusterGetAllReducer,
  hrCompetencyClusterGetList: hrCompetencyClusterGetListReducer,
  hrCompetencyClusterGetById: hrCompetencyClusterGetDetailReducer,
  hrCompetencyClusterPost: hrCompetencyClusterPostReducer,
  hrCompetencyClusterPut: hrCompetencyClusterPutReducer,
};