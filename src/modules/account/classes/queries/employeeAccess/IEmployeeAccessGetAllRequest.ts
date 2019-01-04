import { IEmployeeAccessAllFilter } from '@account/classes/filters';

export interface IEmployeeAccessGetAllRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeAccessAllFilter | undefined;
}