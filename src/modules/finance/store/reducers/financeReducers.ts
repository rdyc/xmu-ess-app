import {
  financeApprovalBulkPostReducer,
  financeApprovalGetAllReducer,
  financeApprovalGetByIdReducer,
  financeApprovalPostReducer,
} from '@finance/store/reducers/approval';

const financeReducers = {
  financeApprovalGetAll: financeApprovalGetAllReducer,
  financeApprovalGetById: financeApprovalGetByIdReducer,
  financeApprovalPost: financeApprovalPostReducer,
  financeApprovalBulkPost: financeApprovalBulkPostReducer,
};

export default financeReducers;