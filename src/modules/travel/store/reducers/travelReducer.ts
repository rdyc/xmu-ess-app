import { 
  travelGetAllReducer,
  travelGetByIdReducer,
  travelPostReducer,
  travelPutReducer,
  travelSettlementGetAllReducer,
  travelSettlementGetByIdReducer,
  travelSettlementPostReducer,
  travelSettlementPutReducer,
} from '@travel/store/reducers';

const travelReducers = {
  travelGetAll: travelGetAllReducer,
  travelGetByID: travelGetByIdReducer,
  travelPost: travelPostReducer,
  travelPut: travelPutReducer,
  travelSettlementGetAll: travelSettlementGetAllReducer,
  travelSettlementGetByID: travelSettlementGetByIdReducer,
  travelSettlementPost: travelSettlementPostReducer,
  travelSettlementPut: travelSettlementPutReducer,
};

export default travelReducers;