import { IHrCompetencyAssessmentGetAllFilter } from '@hr/classes/filters';

export interface IHrCompetencyAssessmentGetAllRequest {
  readonly filter: IHrCompetencyAssessmentGetAllFilter | undefined;  
}