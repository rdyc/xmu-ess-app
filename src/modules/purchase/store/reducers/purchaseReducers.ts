import {
  purchaseApprovalGetAllReducer,
  purchaseApprovalGetByIdReducer,
  purchaseApprovalPostReducer,
  purchaseGetAllReducer,
  purchaseGetByIdReducer,
  purchasePostReducer,
  purchasePutReducer,
  settlementApprovalGetAllReducer,
  settlementApprovalGetByIdReducer,
  settlementApprovalPostReducer,
  settlementGetAllReducer,
  settlementGetByIdReducer,
  settlementPostReducer,
  settlementPutReducer,
} from '@purchase/store/reducers';

const purchaseReducers = {
  purchaseGetAll: purchaseGetAllReducer,
  purchaseGetById: purchaseGetByIdReducer,
  purchasePost: purchasePostReducer,
  purchasePut: purchasePutReducer,
  purchaseApprovalGetAll: purchaseApprovalGetAllReducer,
  purchaseApprovalGetById: purchaseApprovalGetByIdReducer,
  purchaseApprovalPost: purchaseApprovalPostReducer,
  settlementGetAll: settlementGetAllReducer,
  settlementGetById: settlementGetByIdReducer,
  settlementPost: settlementPostReducer,
  settlementPut: settlementPutReducer,
  settlementApprovalGetAll: settlementApprovalGetAllReducer,
  settlementApprovalGetById: settlementApprovalGetByIdReducer,
  settlementApprovalPost: settlementApprovalPostReducer
};

export default purchaseReducers;