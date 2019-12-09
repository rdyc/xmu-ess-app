import { 
  travelGetAllReducer,
  travelGetByIdReducer,
  travelPostReducer,
  travelPutReducer,
} from '@travel/store/reducers';
import { 
  travelSettlementGetAllReducer,
  travelSettlementGetByIdReducer,
  travelSettlementPostReducer,
  travelSettlementPutReducer,
} from '@travel/store/reducers/settlement';
import { 
  travelApprovalGetAllReducer, 
  travelApprovalGetByIdReducer, 
  travelApprovalPostReducer } from './requestApproval';
import { 
  travelSettlementApprovalGetAllReducer, 
  travelSettlementApprovalGetByIdReducer, 
  travelSettlementApprovalPostReducer 
} from './settlementApproval';
import { travelGetAllowedReducer } from './travelGetAllowedReducer';

const travelReducers = {
  travelRequestGetAll: travelGetAllReducer,
  travelRequestGetById: travelGetByIdReducer,
  travelPost: travelPostReducer,
  travelPut: travelPutReducer,
  
  travelSettlementGetAll: travelSettlementGetAllReducer,
  travelSettlementGetById: travelSettlementGetByIdReducer,
  travelSettlementPost: travelSettlementPostReducer,
  travelSettlementPut: travelSettlementPutReducer,

  travelApprovalGetAll: travelApprovalGetAllReducer,
  travelApprovalGetById: travelApprovalGetByIdReducer,
  travelApprovalPost: travelApprovalPostReducer,
  
  travelSettlementApprovalGetAll: travelSettlementApprovalGetAllReducer,
  travelSettlementApprovalGetById: travelSettlementApprovalGetByIdReducer,
  travelSettlementApprovalPost: travelSettlementApprovalPostReducer,

  travelAllowed: travelGetAllowedReducer
};

export default travelReducers;