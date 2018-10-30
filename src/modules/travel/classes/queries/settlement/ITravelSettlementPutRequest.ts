import { IBaseCommand } from '@generic/interfaces';
import { ITravelSettlementPutPayload } from '@travel/classes/request/settlement';

export interface ITravelSettlementPutRequest extends IBaseCommand<ITravelSettlementPutPayload> {
  companyUid: string;
  positionUid: string;
  travelSettlementUid: string;
}