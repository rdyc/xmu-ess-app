import { IExperienceCompetencyUpdateCommand } from './IExperienceCompetencyUpdateCommand';

export interface IEmployeeExperiencePutPayload {
  experienceUid: string;
  company: string;
  position: string;
  professionType: string;
  start: number;
  end: number;
  competencies: IExperienceCompetencyUpdateCommand[];
}