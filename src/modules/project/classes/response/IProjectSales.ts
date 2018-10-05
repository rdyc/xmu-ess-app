import { IAccountEmployee } from '@account/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IProjectSales {
  uid: string | null;
  employeeUid: string;
  employee: IAccountEmployee | null;
  changes: IBaseChanges | null;
}