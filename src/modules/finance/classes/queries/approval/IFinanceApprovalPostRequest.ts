import { IFinanceApprovalPostPayload } from '@finance/classes/request/approval';
import { IBaseCommand } from '@generic/interfaces';

export interface IFinanceApprovalPostRequest extends IBaseCommand<IFinanceApprovalPostPayload> {
  companyUid: string;
  positionUid: string;
  financeUid: string;
}