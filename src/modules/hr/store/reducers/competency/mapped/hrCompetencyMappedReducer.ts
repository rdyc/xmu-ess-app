import { hrCompetencyMappedGetAllReducer } from './hrCompetencyMappedGetAllReducer';
import { hrCompetencyMappedGetCurrentReducer } from './hrCompetencyMappedGetCurrentReducer';
import { hrCompetencyMappedGetDetailReducer } from './hrCompetencyMappedGetDetailReducer';
import { hrCompetencyMappedGetListReducer } from './hrCompetencyMappedGetListReducer';
import { hrCompetencyMappedGetNextReducer } from './hrCompetencyMappedGetNextReducer';
import { hrCompetencyMappedPostReducer } from './hrCompetencyMappedPostReducer';
import { hrCompetencyMappedPutReducer } from './hrCompetencyMappedPutReducer';

export const hrCompetencyMappedReducers = {
  hrCompetencyMappedGetAll: hrCompetencyMappedGetAllReducer,
  hrCompetencyMappedGetList: hrCompetencyMappedGetListReducer,
  hrCompetencyMappedGetById: hrCompetencyMappedGetDetailReducer,
  hrCompetencyMappedGetNext: hrCompetencyMappedGetNextReducer,
  hrCompetencyMappedGetCurrent: hrCompetencyMappedGetCurrentReducer,
  hrCompetencyMappedPost: hrCompetencyMappedPostReducer,
  hrCompetencyMappedPut: hrCompetencyMappedPutReducer,
};