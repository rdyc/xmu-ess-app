import {
  expenseApprovalGetAllReducer,
  expenseApprovalGetByIdReducer,
  expenseApprovalPostReducer,
} from '@expense/store/reducers/approval';
import {
  expenseRequestGetAllReducer,
  expenseRequestGetByIdReducer,
  expenseRequestPostReducer,
  expenseRequestPutReducer,
} from '@expense/store/reducers/request';

const expenseReducers = {
  expenseRequestGetAll: expenseRequestGetAllReducer,
  expenseRequestGetById: expenseRequestGetByIdReducer,
  expenseRequestPost: expenseRequestPostReducer,
  expenseRequestPut: expenseRequestPutReducer,
  expenseApprovalGetAll: expenseApprovalGetAllReducer,
  expenseApprovalGetById: expenseApprovalGetByIdReducer,
  expenseApprovalPost: expenseApprovalPostReducer,
};

export default expenseReducers;