import { IExperienceCompetencyCreateCommand } from './IExperienceCompetencyCreateCommand';

export interface IEmployeeExperiencePostPayload {
  company: string;
  position: string;
  professionType: string;
  start: number;
  end: number;
  competencies: IExperienceCompetencyCreateCommand[];
}