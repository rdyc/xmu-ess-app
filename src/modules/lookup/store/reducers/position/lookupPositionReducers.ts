import { positionDeleteReducer, positionGetAllReducer, positionGetByIdReducer, positionGetListReducer, positionPostReducer, positionPutReducer } from './';

export const lookupPositionReducers = {
  positionGetAll: positionGetAllReducer,
  positionGetList: positionGetListReducer,
  positionGetById: positionGetByIdReducer,
  positionPost: positionPostReducer,
  positionPut: positionPutReducer,
  positionDelete: positionDeleteReducer
};