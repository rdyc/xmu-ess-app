import { IEmployeeContractAllFilter } from '@account/classes/filters/employeeContract';

export interface IEmployeeContractAllRequest {
  employeeUid: string;
  filter?: IEmployeeContractAllFilter;
}