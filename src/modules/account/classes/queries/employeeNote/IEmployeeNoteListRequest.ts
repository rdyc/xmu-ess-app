import { IEmployeeNoteListFilter } from '@account/classes/filters/employeeNote';

export interface IEmployeeNoteListRequest {
  employeeUid: string;
  filter?: IEmployeeNoteListFilter;
}