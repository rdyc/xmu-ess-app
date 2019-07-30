import { hrCompetencyMappedGetAllReducer } from './hrCompetencyMappedGetAllReducer';
import { hrCompetencyMappedGetDetailReducer } from './hrCompetencyMappedGetDetailReducer';
import { hrCompetencyMappedGetListReducer } from './hrCompetencyMappedGetListReducer';
import { hrCompetencyMappedPostReducer } from './hrCompetencyMappedPostReducer';
import { hrCompetencyMappedPutReducer } from './hrCompetencyMappedPutReducer';

export const hrCompetencyMappedReducers = {
  hrCompetencyMappedGetAll: hrCompetencyMappedGetAllReducer,
  hrCompetencyMappedGetList: hrCompetencyMappedGetListReducer,
  hrCompetencyMappedGetById: hrCompetencyMappedGetDetailReducer,
  hrCompetencyMappedPost: hrCompetencyMappedPostReducer,
  hrCompetencyMappedPut: hrCompetencyMappedPutReducer,
};