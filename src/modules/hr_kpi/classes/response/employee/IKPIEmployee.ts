import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IKPIAssign } from '../assign';
export interface IKPIEmployee {
  uid: string;
  kpiAssignUid: string;
  kpiAssign?: IKPIAssign | null;
  period: number;
  totalScore: number;
  isFinal: boolean;
  revision?: string;
  statusType: string;
  status?: ICommonSystem;
  changes: IBaseChanges | null;
}