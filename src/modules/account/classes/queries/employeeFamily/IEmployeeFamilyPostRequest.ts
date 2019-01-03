import { IEmployeeFamilyPostPayload } from '@account/classes/request/employeeFamily';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeFamilyPostRequest extends IBaseCommand<IEmployeeFamilyPostPayload> {
  employeeUid: string;
}