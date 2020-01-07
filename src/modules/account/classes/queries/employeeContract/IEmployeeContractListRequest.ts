import { IEmployeeContractListFilter } from '@account/classes/filters/employeeContract';

export interface IEmployeeContractListRequest {
  employeeUid: string;
  filter?: IEmployeeContractListFilter;
}