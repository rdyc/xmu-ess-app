import { IEmployeeAllFilter } from '@account/classes/filters';

export interface IEmployeeKPIGetAllFilter extends IEmployeeAllFilter  {
  isNotAssigned?: boolean;
  isFinal?: boolean;
  year?: number;
}