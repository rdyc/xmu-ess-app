import {
  expenseApprovalGetAllReducer,
  expenseApprovalGetByIdReducer,
  expenseApprovalPostReducer,
  expenseGetAllReducer,
  expenseGetByIdReducer,
  expensePostReducer,
  expensePutReducer,
} from '@expense/store/reducers';

const expenseReducers = {
  expenseGetAll: expenseGetAllReducer,
  expenseGetById: expenseGetByIdReducer,
  expensePost: expensePostReducer,
  expensePut: expensePutReducer,
  expenseApprovalGetAll: expenseApprovalGetAllReducer,
  expenseApprovalGetById: expenseApprovalGetByIdReducer,
  expenseApprovalPost: expenseApprovalPostReducer,
};

export default expenseReducers;