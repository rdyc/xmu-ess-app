import { hrCompetencyAssessmentGetAllReducer } from './hrCompetencyAssessmentGetAllReducer';
import { hrCompetencyAssessmentGetDetailReducer } from './hrCompetencyAssessmentGetDetailReducer';
import { hrCompetencyAssessmentPostReducer } from './hrCompetencyAssessmentPostReducer';
import { hrCompetencyAssessmentPutReducer } from './hrCompetencyAssessmentPutReducer';

export const hrCompetencyAssessmentReducers = {
  hrCompetencyAssessmentGetAll: hrCompetencyAssessmentGetAllReducer,
  hrCompetencyAssessmentGetById: hrCompetencyAssessmentGetDetailReducer,
  hrCompetencyAssessmentPost: hrCompetencyAssessmentPostReducer,
  hrCompetencyAssessmentPut: hrCompetencyAssessmentPutReducer
};