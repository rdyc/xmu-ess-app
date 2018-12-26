import { financeGetAllReducer, financeGetByIdReducer, financeGetListReducer } from '@common/store/reducers/finance';

const financeReducers = {
  commonFinanceAll: financeGetAllReducer,
  commonFinanceList: financeGetListReducer,
  commonFinanceDetail: financeGetByIdReducer
};

export default financeReducers;