import { IEmployeeNoteAllFilter } from '@account/classes/filters/employeeNote';

export interface IEmployeeNoteAllRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeNoteAllFilter | undefined;
}