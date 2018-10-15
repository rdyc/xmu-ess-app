import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';

export interface IMileageRequest {
  uid: string;
  employeeUid: string;
  employee?: IAccountEmployee | null;
  month: number;
  year: number;
  period?: string | null;
  amount: number;
  statusType: string;
  status?: ICommonSystem | null;
  notes?: string | null;
  isNotified: boolean;
}
