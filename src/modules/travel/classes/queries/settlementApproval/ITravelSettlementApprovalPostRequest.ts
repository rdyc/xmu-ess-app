import { IBaseCommand } from '@generic/interfaces';
import { ITravelSettlementApprovalPostPayload } from '@travel/classes/request/settlementApproval';

export interface ITravelSettlementApprovalPostRequest extends IBaseCommand<ITravelSettlementApprovalPostPayload> {
  companyUid: string;
  positionUid: string;
  travelSettlementUid: string;
}