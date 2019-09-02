import { IEmployee } from '@account/classes/response';
import { IBaseChanges } from '@generic/interfaces';
import { IKPITemplate } from '../template/IKPITemplate';
export interface IKPIAssign {
  uid: string;
  employeeUid: string;
  employee?: IEmployee | null;
  templateUid: string;
  template?: IKPITemplate | null;
  year: number;
  isFinal: boolean;
  revision?: string;
  // sentBy?: string | null;
  // sent?: IEmployee | null;
  // sentAt?: string | null;
  changes: IBaseChanges | null;
}