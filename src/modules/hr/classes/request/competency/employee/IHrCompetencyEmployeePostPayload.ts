import { IEmployeeItemCreate } from './IEmployeeItemCreate';

export interface IHrCompetencyEmployeePostPayload {
  items: IEmployeeItemCreate[];
  assessmentYear: number;
}