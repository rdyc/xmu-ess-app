import { IEmployee } from '@account/classes/response';
import { IBaseChanges } from '@generic/interfaces';
import { IKPITemplate } from '..';
import { IKPIFinalItem } from './IKPIFinalItem';

export interface IKPIFinalDetail {
  uid: string;
  employeeUid: string;
  employee?: IEmployee | null;
  templateUid: string;
  template?: IKPITemplate | null;
  period: number;
  year: number;
  totalScore: number;
  items?: IKPIFinalItem[] | null;
  changes: IBaseChanges | null;
}