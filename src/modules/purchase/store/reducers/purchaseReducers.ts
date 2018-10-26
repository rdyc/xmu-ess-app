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
  
  /* Purchase Request */
  purchaseGetAll: purchaseGetAllReducer,
  purchaseGetById: purchaseGetByIdReducer,
  purchasePost: purchasePostReducer,
  purchasePut: purchasePutReducer,

  /* Purchase Request Approval */
  purchaseApprovalGetAll: purchaseApprovalGetAllReducer,
  purchaseApprovalGetById: purchaseApprovalGetByIdReducer,
  purchaseApprovalPost: purchaseApprovalPostReducer,

  /* Purchase Settlement */
  settlementGetAll: settlementGetAllReducer,
  settlementGetById: settlementGetByIdReducer,
  settlementPost: settlementPostReducer,
  settlementPut: settlementPutReducer,

  /* Purchase Settlement Approval */
  settlementApprovalGetAll: settlementApprovalGetAllReducer,
  settlementApprovalGetById: settlementApprovalGetByIdReducer,
  settlementApprovalPost: settlementApprovalPostReducer
};

export default purchaseReducers;