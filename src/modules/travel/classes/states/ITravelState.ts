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
  ITravelSettlement 
} from '@travel/classes/response';
export interface ITravelState {
  travelRequestGetAll: IQueryCollectionState<ITravelGetAllRequest, ITravelRequest>;
  travelRequestGetById: IQuerySingleState<ITravelGetByIdRequest, ITravelRequest>;
  travelPost: IQuerySingleState<ITravelPostRequest, ITravelRequest>;
  travelPut: IQuerySingleState<ITravelPutRequest, ITravelRequest>;
  travelSettlementGetAll: IQueryCollectionState<ITravelSettlementGetAllRequest, ITravelSettlement>;
  travelSettlementGetById: IQuerySingleState<ITravelSettlementGetByIdRequest, ITravelRequest>;
  travelSettlementPost: IQuerySingleState<ITravelSettlementPostRequest, ITravelRequest>;
  travelSettlementPut: IQuerySingleState<ITravelSettlementPutRequest, ITravelRequest>;
}