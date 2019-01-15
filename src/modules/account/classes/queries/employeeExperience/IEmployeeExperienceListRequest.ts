import { IEmployeeExperienceListFilter } from '@account/classes/filters/employeeExperience';

export interface IEmployeeExperienceListRequest {
  employeeUid: string;
  filter: IEmployeeExperienceListFilter;
}