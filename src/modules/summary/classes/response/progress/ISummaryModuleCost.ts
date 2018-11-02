import { IAccountEmployee } from '@account/classes';

export interface ISummaryModuleCost {
  module: string;
  documentUid: string;
  employeeUid?: string;
  employee?: IAccountEmployee | null;
  supplier?: string | null;
  date: string;
  amount: number;
}