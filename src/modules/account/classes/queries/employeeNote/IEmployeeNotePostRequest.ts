import { IEmployeeNotePostPayload } from '@account/classes/request/employeeNote';
import { IBaseCommand } from '@generic/interfaces';

export interface IEmployeeNotePostRequest extends IBaseCommand<IEmployeeNotePostPayload> {
  employeeUid: string;
}