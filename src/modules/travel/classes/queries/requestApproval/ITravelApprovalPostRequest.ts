import { IBaseCommand } from '@generic/interfaces';
import { ITravelApprovalPostPayload } from '@travel/classes/request/requestApproval';

export interface ITravelApprovalPostRequest extends IBaseCommand<ITravelApprovalPostPayload> {
  companyUid: string;
  positionUid: string;
  travelUid: string;
}