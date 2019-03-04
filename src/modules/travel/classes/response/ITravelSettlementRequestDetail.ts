import { ITravelRequestDetail, ITravelSettlementDetail } from '.';

export interface ITravelSettlementRequestDetail {
  request?: ITravelRequestDetail;
  settlement: ITravelSettlementDetail;
}