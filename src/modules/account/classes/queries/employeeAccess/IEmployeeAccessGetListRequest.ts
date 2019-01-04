import { IEmployeeAccessListFilter } from '../../filters/IEmployeeAccessListFilter';

export interface IEmployeeAccessGetListRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeAccessListFilter | undefined;
}