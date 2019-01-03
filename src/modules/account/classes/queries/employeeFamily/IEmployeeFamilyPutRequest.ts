import { IEmployeeFamilyPutPayload } from '@account/classes/request/employeeFamily';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeFamilyPutRequest extends IBaseCommand<IEmployeeFamilyPutPayload> {
  employeeUid: string;
}