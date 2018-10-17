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
  travelRequestGetAll: travelGetAllReducer,
  travelRequestGetById: travelGetByIdReducer,
  travelPost: travelPostReducer,
  travelPut: travelPutReducer,
  travelSettlementGetAll: travelSettlementGetAllReducer,
  travelSettlementGetById: travelSettlementGetByIdReducer,
  travelSettlementPost: travelSettlementPostReducer,
  travelSettlementPut: travelSettlementPutReducer,
};

export default travelReducers;