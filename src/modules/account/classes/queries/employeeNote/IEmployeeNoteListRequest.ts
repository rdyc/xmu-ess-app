import { IEmployeeNoteListFilter } from '@account/classes/filters/employeeNote';

export interface IEmployeeNoteListRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeNoteListFilter | undefined;
}