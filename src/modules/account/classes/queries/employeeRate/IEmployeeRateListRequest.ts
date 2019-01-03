import { IEmployeeRateListFilter } from '@account/classes/filters/employeeRate';

export interface IEmployeeRateListRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeRateListFilter | undefined;
}