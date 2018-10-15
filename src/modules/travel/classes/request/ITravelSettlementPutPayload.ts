import { IBasePayload } from '@generic/interfaces';
import { ITravelSettlementPutItem } from '@travel/classes/request';

export interface ITravelSettlementPutPayload extends IBasePayload {
  travelUid: string;
  start: string;
  end: string;
  comment: string | null;
  item?: ITravelSettlementPutItem[]; 
}