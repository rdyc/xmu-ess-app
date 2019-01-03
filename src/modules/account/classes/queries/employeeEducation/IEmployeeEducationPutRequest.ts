import { IEmployeeEducationPutPayload } from '@account/classes/request/employeeEducation';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeEducationPutRequest extends IBaseCommand<IEmployeeEducationPutPayload> {
  employeeUid: string;
}