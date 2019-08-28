import { IAssessmentItemCreate } from './IAssessmentItemCreate';

export interface IHrCompetencyAssessmentPostPayload {
  employeeUid: string;
  positionUid: string;
  assessmentYear: number;
  responders?: IAssessmentItemCreate[];
}