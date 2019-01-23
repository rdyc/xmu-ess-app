import { IEmployeeAccessPutPayload } from '@account/classes/request/employeeAccess';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeAccessPutRequest extends IBaseCommand<IEmployeeAccessPutPayload> {
  employeeUid: string;
}