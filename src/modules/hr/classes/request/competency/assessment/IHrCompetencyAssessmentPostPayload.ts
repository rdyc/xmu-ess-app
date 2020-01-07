import { IAssessmentItemCreate } from './IAssessmentItemCreate';

export interface IHrCompetencyAssessmentPostPayload {
  employeeUid: string;
  companyUid: string;
  positionUid: string;
  assessmentYear: number;
  responders: IAssessmentItemCreate[];
}