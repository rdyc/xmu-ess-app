import { IEmployeeEducationDeletePayload } from '@account/classes/request/employeeEducation';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeEducationDeleteRequest extends IBaseCommand<IEmployeeEducationDeletePayload> {
  employeeUid: string;
}