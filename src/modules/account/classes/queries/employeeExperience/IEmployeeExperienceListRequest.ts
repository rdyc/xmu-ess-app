import { IEmployeeExperienceListFilter } from '@account/classes/filters/employeeExperience';

export interface IEmployeeExperienceListRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeExperienceListFilter;
}