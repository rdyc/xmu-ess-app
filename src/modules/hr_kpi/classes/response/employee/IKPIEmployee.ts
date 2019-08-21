import { IEmployee } from '@account/classes/response';
import { IBaseChanges } from '@generic/interfaces';
import { IKPITemplate } from '..';
import { IKPIEmployeeItem } from './IKPIEmployeeItem';
export interface IKPIEmployee {
  uid: string;
  employeeUid: string;
  employee?: IEmployee | null;
  templateUid: string;
  template?: IKPITemplate | null;
  year: number;
  period: number;
  totalScore: number;
  isFinal: boolean;
  revision?: string;
  items?: IKPIEmployeeItem[] | null;
  sentBy?: string | null;
  sent?: IEmployee | null;
  sentAt?: string | null;
  changes: IBaseChanges | null;
}