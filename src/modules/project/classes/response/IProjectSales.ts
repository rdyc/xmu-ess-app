import { IAccountEmployee } from '@account/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IProjectSales {
  uid?: string;
  employeeUid: string;
  employee?: IAccountEmployee;
  changes?: IBaseChanges;
}