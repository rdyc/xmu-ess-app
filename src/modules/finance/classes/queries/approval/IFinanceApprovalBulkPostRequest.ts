import { IFinanceApprovalBulkPostPayload } from '@finance/classes/request/approval';
import { IBaseCommand } from '@generic/interfaces';

export interface IFinanceApprovalBulkPostRequest extends IBaseCommand<IFinanceApprovalBulkPostPayload> {
  companyUid: string;
  positionUid: string;
}