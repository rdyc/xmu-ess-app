import {
  projectApprovalGetAllReducer,
  projectApprovalGetByIdReducer,
  projectApprovalPostReducer,
} from '@project/store/reducers/approval';

const projectApprovalReducers = {
  projectApprovalGetAll: projectApprovalGetAllReducer,
  projectApprovalGetById: projectApprovalGetByIdReducer,
  projectApprovalPost: projectApprovalPostReducer,
};

export default projectApprovalReducers;