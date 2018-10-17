import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  ITravelGetAllRequest,
  ITravelGetByIdRequest,
  ITravelPostRequest,
  ITravelPutRequest,
  ITravelSettlementGetAllRequest,
  ITravelSettlementGetByIdRequest,
  ITravelSettlementPostRequest,
  ITravelSettlementPutRequest, 
} from '@travel/classes/queries';
import { 
  ITravelRequest,  
  ITravelRequestDetail,
  ITravelSettlement,
  ITravelSettlementDetail,
} from '@travel/classes/response';
export interface ITravelState {
  travelRequestGetAll: IQueryCollectionState<ITravelGetAllRequest, ITravelRequest>;
  travelRequestGetById: IQuerySingleState<ITravelGetByIdRequest, ITravelRequestDetail>;
  travelPost: IQuerySingleState<ITravelPostRequest, ITravelRequest>;
  travelPut: IQuerySingleState<ITravelPutRequest, ITravelRequest>;
  travelSettlementGetAll: IQueryCollectionState<ITravelSettlementGetAllRequest, ITravelSettlement>;
  travelSettlementGetById: IQuerySingleState<ITravelSettlementGetByIdRequest, ITravelSettlementDetail>;
  travelSettlementPost: IQuerySingleState<ITravelSettlementPostRequest, ITravelSettlement>;
  travelSettlementPut: IQuerySingleState<ITravelSettlementPutRequest, ITravelSettlement>;
}