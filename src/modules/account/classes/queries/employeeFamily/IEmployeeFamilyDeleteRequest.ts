import { IEmployeeFamilyDeletePayload } from '@account/classes/request/employeeFamily';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeFamilyDeleteRequest extends IBaseCommand<IEmployeeFamilyDeletePayload> {
  employeeUid: string;
}