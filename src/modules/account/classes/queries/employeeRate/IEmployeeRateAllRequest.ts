import { IEmployeeRateAllFilter } from '@account/classes/filters/employeeRate';

export interface IEmployeeRateAllRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeRateAllFilter | undefined;
}