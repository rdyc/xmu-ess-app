import { IEmployeeItemCreate } from './IEmployeeItemCreate';

export interface IHrCompetencyEmployeePatchPayload {
  respondenUid: string;
  companyUid: string;
  positionUid: string;
  items: IEmployeeItemCreate[];  
  isDraft?: boolean;
}