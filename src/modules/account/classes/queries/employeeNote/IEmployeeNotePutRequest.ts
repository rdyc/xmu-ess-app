import { IEmployeeNotePutPayload } from '@account/classes/request/employeeNote';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeNotePutRequest extends IBaseCommand<IEmployeeNotePutPayload> {
  employeeUid: string;
}