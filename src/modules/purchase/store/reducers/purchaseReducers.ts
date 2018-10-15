import {
  purchaseApprovalGetAllReducer,
  purchaseApprovalGetByIdReducer,
  purchaseGetAllReducer,
  purchaseGetByIdReducer,
  settlementApprovalGetAllReducer,
  settlementApprovalGetByIdReducer,
  settlementGetAllReducer,
  settlementGetByIdReducer,
} from '@purchase/store/reducers';

const purchaseReducers = {
  purchaseGetAll: purchaseGetAllReducer,
  purchaseGetById: purchaseGetByIdReducer,
  purchaseApprovalGetAll: purchaseApprovalGetAllReducer,
  purchaseApprovalGetById: purchaseApprovalGetByIdReducer,
  settlementGetAll: settlementGetAllReducer,
  settlementGetById: settlementGetByIdReducer,
  settlementApprovalGetAll: settlementApprovalGetAllReducer,
  settlementApprovalGetBy: settlementApprovalGetByIdReducer,
};

export default purchaseReducers;