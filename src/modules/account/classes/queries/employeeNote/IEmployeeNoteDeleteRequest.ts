import { IEmployeeNoteDeletePayload } from '@account/classes/request/employeeNote';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeNoteDeleteRequest extends IBaseCommand<IEmployeeNoteDeletePayload> {
  employeeUid: string;  
}