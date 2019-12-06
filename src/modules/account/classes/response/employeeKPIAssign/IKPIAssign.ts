import { IKPIAssignItem } from '@account/classes/response/employeeKPIAssign';
import { IBaseChanges } from '@generic/interfaces';
import { IEmployee } from '..';

export interface IKPIAssign {
  uid: string;
  employeeUid: string;
  employee?: IEmployee;
  year: number;
  templateUid: string;
  isFinal: boolean;
  revision?: string;
  note?: string;
  items: IKPIAssignItem[];
  changes?: IBaseChanges;
}