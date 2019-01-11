import { IEmployeeExperienceAllFilter } from '@account/classes/filters/employeeExperience';

export interface IEmployeeExperienceAllRequest {
  employeeUid: string;
  filter: IEmployeeExperienceAllFilter;
}