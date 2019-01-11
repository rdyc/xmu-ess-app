import { IEmployeeNoteAllFilter } from '@account/classes/filters/employeeNote';

export interface IEmployeeNoteAllRequest {
  employeeUid: string;
  filter?: IEmployeeNoteAllFilter;
}