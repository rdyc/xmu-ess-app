import { IKPIEmployeeGetAllFilter } from '@kpi/classes/filter/employee';

export interface IKPIEmployeeGetAllRequest {
  readonly companyUid: string;
  readonly positionUid: string;
  filter?: IKPIEmployeeGetAllFilter;
}