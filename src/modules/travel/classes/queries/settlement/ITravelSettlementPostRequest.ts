import { IBaseCommand } from '@generic/interfaces';
import { ITravelSettlementPostPayload } from '@travel/classes/request/settlement';

export interface ITravelSettlementPostRequest extends IBaseCommand<ITravelSettlementPostPayload> {
  companyUid: string;
  positionUid: string;
}