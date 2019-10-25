import { IAssessmentItemCreate } from './IAssessmentItemCreate';

export interface IHrCompetencyAssessmentPutPayload {
  employeeUid: string;
  companyUid: string;
  positionUid: string;
  assessmentYear: number;
  responders: IAssessmentItemCreate[];
}