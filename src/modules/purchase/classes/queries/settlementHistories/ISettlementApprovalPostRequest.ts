import { IBaseCommand } from '@generic/interfaces';
import { ISettlementApprovalPostPayload } from '@purchase/classes/request/settlementHistories';

export interface ISettlementApprovalPostRequest extends IBaseCommand<ISettlementApprovalPostPayload> {
  companyUid: string;
  positionUid: string;
  purchaseUid: string;
}