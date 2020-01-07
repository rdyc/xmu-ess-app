import { IKPIAssignGetAllFilter } from '@kpi/classes/filter/assign';

export interface IKPIAssignGetAllRequest {
  readonly employeeUid: string;
  filter?: IKPIAssignGetAllFilter;
}