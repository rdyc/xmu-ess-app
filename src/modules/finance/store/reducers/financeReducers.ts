import {
  financeBulkPostReducer,
  financeGetAllReducer,
  financeGetByIdReducer,
  financePostReducer,
} from '@finance/store/reducers';

const financeReducers = {
  financeGetAll: financeGetAllReducer,
  financeGetById: financeGetByIdReducer,
  financePost: financePostReducer,
  financeBulkPost: financeBulkPostReducer,
};

export default financeReducers;