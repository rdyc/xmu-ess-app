import { IBaseChanges } from '@generic/interfaces';
import { IEmployee } from '..';
import { IKPIFinalItem } from './IKPIFinalItem';

export interface IKPIFinal {
  uid: string;
  employeeUid: string;
  employee?: IEmployee;
  period: number;
  year: number;
  templateUid: string;
  totalScore: number;
  items: IKPIFinalItem[];
  changes?: IBaseChanges;
}