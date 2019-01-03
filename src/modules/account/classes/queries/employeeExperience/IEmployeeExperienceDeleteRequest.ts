import { IEmployeeExperienceDeletePayload } from '@account/classes/request/employeeExperience';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeExperienceDeleteRequest extends IBaseCommand<IEmployeeExperienceDeletePayload> {
  employeeUid: string;
}