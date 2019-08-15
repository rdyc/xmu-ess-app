import { hrCompetencyIndicatorGetAllReducer } from './hrCompetencyIndicatorGetAllReducer';
import { hrCompetencyIndicatorGetDetailReducer } from './hrCompetencyIndicatorGetDetailReducer';
import { hrCompetencyIndicatorGetListReducer } from './hrCompetencyIndicatorGetListReducer';
import { hrCompetencyIndicatorPostReducer } from './hrCompetencyIndicatorPostReducer';
import { hrCompetencyIndicatorPutReducer } from './hrCompetencyIndicatorPutReducer';

export const hrCompetencyIndicatorReducers = {
  hrCompetencyIndicatorGetAll: hrCompetencyIndicatorGetAllReducer,
  hrCompetencyIndicatorGetList: hrCompetencyIndicatorGetListReducer,
  hrCompetencyIndicatorGetById: hrCompetencyIndicatorGetDetailReducer,
  hrCompetencyIndicatorPost: hrCompetencyIndicatorPostReducer,
  hrCompetencyIndicatorPut: hrCompetencyIndicatorPutReducer,
};