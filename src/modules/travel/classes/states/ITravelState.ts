import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  ITravelGetAllowedRequest,
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
  ITravelAllowedCreate,  
  ITravelRequest,
  ITravelRequestDetail,
  ITravelSettlement,
  ITravelSettlementRequestDetail,
} from '@travel/classes/response';
import { ITravelSettlementApprovalGetAllRequest, ITravelSettlementApprovalGetByIdRequest, ITravelSettlementApprovalPostRequest } from '../queries/settlementApproval';

export interface ITravelState {
  // travel request
  travelRequestGetAll: IQueryCollectionState<ITravelGetAllRequest, ITravelRequest>;
  travelRequestGetById: IQuerySingleState<ITravelGetByIdRequest, ITravelRequestDetail>;
  travelPost: IQuerySingleState<ITravelPostRequest, ITravelRequest>;
  travelPut: IQuerySingleState<ITravelPutRequest, ITravelRequest>;
  travelAllowed: IQuerySingleState<ITravelGetAllowedRequest, ITravelAllowedCreate>;

  // travel settlement
  travelSettlementGetAll: IQueryCollectionState<ITravelSettlementGetAllRequest, ITravelSettlement>;
  travelSettlementGetById: IQuerySingleState<ITravelSettlementGetByIdRequest, ITravelSettlementRequestDetail>;
  travelSettlementPost: IQuerySingleState<ITravelSettlementPostRequest, ITravelSettlement>;
  travelSettlementPut: IQuerySingleState<ITravelSettlementPutRequest, ITravelSettlement>;

  // travel approval
  travelApprovalGetAll: IQueryCollectionState<ITravelApprovalGetAllRequest, ITravelRequest>;
  travelApprovalGetById: IQuerySingleState<ITravelApprovalGetByIdRequest, ITravelRequestDetail>;
  travelApprovalPost: IQuerySingleState<ITravelApprovalPostRequest, ITravelRequest>;

  // travel settlement approval
  travelSettlementApprovalGetAll: IQueryCollectionState<ITravelSettlementApprovalGetAllRequest, ITravelSettlement>;
  travelSettlementApprovalGetById: IQuerySingleState<ITravelSettlementApprovalGetByIdRequest, ITravelSettlementRequestDetail>;
  travelSettlementApprovalPost: IQuerySingleState<ITravelSettlementApprovalPostRequest, ITravelSettlement>;  
}