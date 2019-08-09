import { IEmployee } from '@account/classes/response';
import { IBaseChanges } from '@generic/interfaces';
import { IKPITemplate } from '..';
import { IEmployeeKPIItem } from './IEmployeeKPIItem';
export interface IEmployeeKPI {
  uid: string;
  employeeUid: string;
  employee?: IEmployee | null;
  templateUid: string;
  template?: IKPITemplate | null;
  year: number;
  totalScore: number;
  items?: IEmployeeKPIItem[] | null;
  sentBy?: string | null;
  sent?: IEmployee | null;
  sentAt?: string | null;
  changes: IBaseChanges | null;
}