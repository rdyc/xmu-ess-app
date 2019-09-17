import { IKPIFinalGetAllFilter } from '@kpi/classes/filter/final';

export interface IKPIFinalGetAllRequest {
  readonly employeeUid: string;
  filter?: IKPIFinalGetAllFilter;
}