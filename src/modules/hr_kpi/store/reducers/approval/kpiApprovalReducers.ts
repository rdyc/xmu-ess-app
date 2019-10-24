import {
  kpiApprovalGetAllReducer,
  kpiApprovalGetByIdReducer,
  kpiApprovalPostReducer,
} from '@kpi/store/reducers/approval';

const kpiApprovalReducers = {
  kpiApprovalGetAll: kpiApprovalGetAllReducer,
  kpiApprovalGetById: kpiApprovalGetByIdReducer,
  kpiApprovalPost: kpiApprovalPostReducer,
};

export default kpiApprovalReducers;