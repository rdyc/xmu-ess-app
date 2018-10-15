import { IBasePayload } from '@generic/interfaces';
import { ITravelSettlementPostItem } from './ITravelSettlementPostItem';

export interface ITravelSettlementPostPayload extends IBasePayload {
  travelUid: string;
  start: string;
  end: string;
  comment: string;
  item?: ITravelSettlementPostItem; 
}