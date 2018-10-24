import {
  leaveApprovalGetAllReducer,
  leaveApprovalGetByIdReducer,
  leaveApprovalPostReducer,
} from '@leave/store/reducers/approval';

const leaveApprovalReducers = {
  leaveApprovalGetAll: leaveApprovalGetAllReducer,
  leaveApprovalGetById: leaveApprovalGetByIdReducer,
  leaveApprovalPost: leaveApprovalPostReducer,
};

export default leaveApprovalReducers;