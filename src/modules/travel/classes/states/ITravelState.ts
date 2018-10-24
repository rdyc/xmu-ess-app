import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  ITravelGetAllRequest,
  ITravelGetByIdRequest,
  ITravelPostRequest,
  ITravelPutRequest 
} from '@travel/classes/queries';
import { ITravelApprovalGetAllRequest, ITravelApprovalGetByIdRequest, ITravelApprovalPostRequest } from '@travel/classes/queries/requestApproval';
import { 
  ITravelSettlementGetAllRequest,
  ITravelSettlementGetByIdRequest,
  ITravelSettlementPostRequest,
  ITravelSettlementPutRequest, 
} from '@travel/classes/queries/settlement';
import { 
  ITravelRequest,  
  ITravelRequestDetail,
  ITravelSettlement,
  ITravelSettlementDetail,
} from '@travel/classes/response';
import { ITravelSettlementApprovalGetAllRequest, ITravelSettlementApprovalGetByIdRequest, ITravelSettlementApprovalPostRequest } from '../queries/settlementApproval';

export interface ITravelState {
  // travel request
  travelRequestGetAll: IQueryCollectionState<ITravelGetAllRequest, ITravelRequest>;
  travelRequestGetById: IQuerySingleState<ITravelGetByIdRequest, ITravelRequestDetail>;
  travelPost: IQuerySingleState<ITravelPostRequest, ITravelRequest>;
  travelPut: IQuerySingleState<ITravelPutRequest, ITravelRequest>;

  // travel settlement
  travelSettlementGetAll: IQueryCollectionState<ITravelSettlementGetAllRequest, ITravelSettlement>;
  travelSettlementGetById: IQuerySingleState<ITravelSettlementGetByIdRequest, ITravelSettlementDetail>;
  travelSettlementPost: IQuerySingleState<ITravelSettlementPostRequest, ITravelSettlement>;
  travelSettlementPut: IQuerySingleState<ITravelSettlementPutRequest, ITravelSettlement>;

  // travel approval
  travelApprovalGetAll: IQueryCollectionState<ITravelApprovalGetAllRequest, ITravelRequest>;
  travelApprovalGetById: IQuerySingleState<ITravelApprovalGetByIdRequest, ITravelRequestDetail>;
  travelApprovalPost: IQuerySingleState<ITravelApprovalPostRequest, ITravelRequest>;

  // travel settlement approval
  travelSettlementApprovalGetAll: IQueryCollectionState<ITravelSettlementApprovalGetAllRequest, ITravelSettlement>;
  travelSettlementApprovalGetById: IQuerySingleState<ITravelSettlementApprovalGetByIdRequest, ITravelSettlementDetail>;
  travelSettlementApprovalPost: IQuerySingleState<ITravelSettlementApprovalPostRequest, ITravelSettlement>;  
}