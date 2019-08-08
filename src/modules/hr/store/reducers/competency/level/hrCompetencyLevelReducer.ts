import { hrCompetencyLevelGetAllReducer } from './hrCompetencyLevelGetAllReducer';
import { hrCompetencyLevelGetDetailReducer } from './hrCompetencyLevelGetDetailReducer';
import { hrCompetencyLevelGetListReducer } from './hrCompetencyLevelGetListReducer';
import { hrCompetencyLevelPostReducer } from './hrCompetencyLevelPostReducer';
import { hrCompetencyLevelPutReducer } from './hrCompetencyLevelPutReducer';

export const hrCompetencyLevelReducers = {
  hrCompetencyLevelGetAll: hrCompetencyLevelGetAllReducer,
  hrCompetencyLevelGetList: hrCompetencyLevelGetListReducer,
  hrCompetencyLevelGetById: hrCompetencyLevelGetDetailReducer,
  hrCompetencyLevelPost: hrCompetencyLevelPostReducer,
  hrCompetencyLevelPut: hrCompetencyLevelPutReducer,
};