import { IBasePayload } from '@generic/interfaces';
import { IFinanceApprovalItem } from './IFinanceApprovalItem';

export interface IFinanceBulkPostPayload extends IBasePayload {
  financeUids: IFinanceApprovalItem[] | null;
  statusType: string;
  notes: string;
}