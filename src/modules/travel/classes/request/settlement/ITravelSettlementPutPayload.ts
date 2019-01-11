import { IBasePayload } from '@generic/interfaces';
import { ITravelSettlementPutItem } from '@travel/classes/request/settlement';

export interface ITravelSettlementPutPayload extends IBasePayload {
  travelUid: string;
  start: string;
  end: string;
  comment?: string;
  item?: ITravelSettlementPutItem[]; 
}