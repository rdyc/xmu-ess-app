import { IEmployeeItemCreate } from './IEmployeeItemCreate';

export interface IHrCompetencyEmployeePatchPayload {
  items: IEmployeeItemCreate[];  
  isDraft?: boolean;
}