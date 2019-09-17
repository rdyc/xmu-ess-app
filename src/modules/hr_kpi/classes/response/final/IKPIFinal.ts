import { IEmployee } from '@account/classes/response';
import { IBaseChanges } from '@generic/interfaces';
import { IKPITemplate } from '../template/IKPITemplate';
export interface IKPIFinal {
  uid: string;
  employeeUid: string;
  employee?: IEmployee | null;
  templateUid: string;
  template?: IKPITemplate | null;
  year: number;
  period: number;
  totalScore: number;
  changes: IBaseChanges | null;
}