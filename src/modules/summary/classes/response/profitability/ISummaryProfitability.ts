import { ILookupCustomer } from '@lookup/classes';
import { ISummaryProfitabilityProject } from '@summary/classes/response/profitability';

export interface ISummaryProfitability {
  customerUid: string;
  customer?: ILookupCustomer | null;
  totalValue: number;
  totalCogs: number;
  percentage: number;
  profit: number;
  projects?: ISummaryProfitabilityProject[] | null;
}