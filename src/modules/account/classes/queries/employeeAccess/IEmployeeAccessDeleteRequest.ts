import { IEmployeeAccessDeletePayload } from '@account/classes/request/employeeAccess';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeAccessDeleteRequest extends IBaseCommand<IEmployeeAccessDeletePayload> {
  employeeUid: string;
}