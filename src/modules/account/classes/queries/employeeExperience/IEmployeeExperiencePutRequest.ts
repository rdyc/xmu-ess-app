import { IEmployeeExperiencePutPayload } from '@account/classes/request/employeeExperience';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeExperiencePutRequest extends IBaseCommand<IEmployeeExperiencePutPayload> {
  employeeUid: string;
}