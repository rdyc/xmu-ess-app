import { ILookupCustomer } from '@lookup/classes';
import { ISummaryProgressProject } from '@summary/classes/response/progress';

export interface ISummaryProgress {
  customerUid: string;
  customer?: ILookupCustomer | null;
  totalValue: number;
  totalCogs: number;
  percentage: number;
  profit: number;
  projects?: ISummaryProgressProject[] | null;
}