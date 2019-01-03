import { IEmployeeExperienceAllFilter } from '@account/classes/filters/employeeExperience';

export interface IEmployeeExperienceAllRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeExperienceAllFilter;
}