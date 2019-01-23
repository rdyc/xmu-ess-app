import { IEmployeeAccessPostPayload } from '@account/classes/request/employeeAccess';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeAccessPostRequest extends IBaseCommand<IEmployeeAccessPostPayload> {
  employeeUid: string;
}