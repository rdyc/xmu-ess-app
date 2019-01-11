import { IBasePayload } from '@generic/interfaces';
import { IFinanceApprovalItem } from './IFinanceApprovalItem';

export interface IFinanceApprovalBulkPostPayload extends IBasePayload {
  financeUids?: IFinanceApprovalItem[];
  statusType: string;
  notes: string;
}