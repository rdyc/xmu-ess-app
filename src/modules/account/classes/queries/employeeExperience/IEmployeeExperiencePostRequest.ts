import { IEmployeeExperiencePostPayload } from '@account/classes/request/employeeExperience';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeExperiencePostRequest extends IBaseCommand<IEmployeeExperiencePostPayload> {
  employeeUid: string;
}