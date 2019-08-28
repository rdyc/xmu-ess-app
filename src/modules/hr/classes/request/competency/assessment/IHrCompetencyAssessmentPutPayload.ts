import { IAssessmentItemCreate } from './IAssessmentItemCreate';

export interface IHrCompetencyAssessmentPutPayload {
  employeeUid: string;
  positionUid: string;
  assessmentYear: number;
  responders?: IAssessmentItemCreate[];
}