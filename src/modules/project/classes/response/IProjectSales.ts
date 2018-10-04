import { IBaseChanges } from '@generic/interfaces';
import { IAccountEmployee } from '@account/classes';

export interface IProjectSales {
  uid:         string | null;
  employeeUid: string;
  employee:    IAccountEmployee | null;
  changes:     IBaseChanges | null;
}