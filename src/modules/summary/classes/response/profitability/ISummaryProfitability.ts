import { ILookupCustomer } from '@lookup/classes';
import { ISummaryProfitabilityProject } from './ISummaryProfitabilityProject';

export interface ISummaryProfitability {
  customerUid: string;
  customer?: ILookupCustomer | null;
  totalValue: number;
  totalCogs: number;
  percentage: number;
  profit: number;
  projects?: ISummaryProfitabilityProject[] | null;
}