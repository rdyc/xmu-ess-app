import { IEmployeeEducationPostPayload } from '@account/classes/request/employeeEducation';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeEducationPostRequest extends IBaseCommand<IEmployeeEducationPostPayload> {
  employeeUid: string;
}