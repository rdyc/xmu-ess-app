import { IBaseChanges } from '@generic/interfaces';
import { IAccountEmployee } from '@account/interfaces';

export interface IProjectSales {
  uid:         string;
  employeeUid: string;
  employee:    IAccountEmployee | null;
  changes:     IBaseChanges;
}