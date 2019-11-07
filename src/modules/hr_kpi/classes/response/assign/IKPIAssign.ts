import { IEmployee } from '@account/classes/response';
import { IBaseChanges } from '@generic/interfaces';
import { IKPITemplate } from '../template/IKPITemplate';
export interface IKPIAssign {
  uid: string;
  isAssignInUse: boolean;
  employeeUid: string;
  employee?: IEmployee | null;
  templateUid: string;
  template?: IKPITemplate | null;
  year: number;
  isFinal: boolean;
  revision?: string;
  note?: string;
  finalDate?: string;
  changes: IBaseChanges | null;
}