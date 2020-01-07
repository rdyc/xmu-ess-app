import { IEmployee } from '@account/classes/response';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ICompany, IPosition } from '@lookup/classes/response';
import { IKPIAssign } from '../assign';
export interface IKPIEmployee {
  uid: string;
  companyUid: string;
  company?: ICompany | null;
  positionUid: string;
  position?: IPosition | null;
  employeeUid: string;
  employee?: IEmployee | null;
  kpiAssignUid: string;
  kpiAssign?: IKPIAssign | null;
  period: number;
  year: number;
  totalScore: number;
  isFinal: boolean;
  revision?: string;
  statusType: string;
  status?: ICommonSystem;
  notes?: string;
  changes: IBaseChanges | null;
}