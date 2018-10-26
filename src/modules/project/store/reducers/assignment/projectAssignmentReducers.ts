import {
  projectAssignmentGetAllReducer,
  projectAssignmentGetByIdReducer,
  projectAssignmentGetListReducer,
  projectAssignmentPatchReducer
} from '@project/store/reducers/assignment';

const projectAssignmentReducers = {
  projectAssignmentGetAll: projectAssignmentGetAllReducer,
  projectAssignmentGetList: projectAssignmentGetListReducer,
  projectAssignmentGetById: projectAssignmentGetByIdReducer,
  projectAssignmentPatch: projectAssignmentPatchReducer,
};

export default projectAssignmentReducers;