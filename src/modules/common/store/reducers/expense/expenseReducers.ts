import { expenseGetAllReducer, expenseGetByIdReducer, expenseGetListReducer } from '@common/store/reducers/expense';

const expenseReducers = {
  commonExpenseAll: expenseGetAllReducer,
  commonExpenseList: expenseGetListReducer,
  commonExpenseDetail: expenseGetByIdReducer
};

export default expenseReducers;