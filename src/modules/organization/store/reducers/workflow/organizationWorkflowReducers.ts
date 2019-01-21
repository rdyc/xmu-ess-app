import { organizationWorkflowDeleteReducer } from './organizationWorkflowDeleteReducer';
import { organizationWorkflowGetAllReducer } from './organizationWorkflowGetAllReducer';
import { organizationWorkflowGetByIdReducer } from './organizationWorkflowGetByIdReducer';
import { organizationWorkflowGetListReducer } from './organizationWorkflowGetListReducer';
import { organizationWorkflowPostReducer } from './organizationWorkflowPostReducer';
import { organizationWorkflowPutReducer } from './organizationWorkflowPutReducer';

export const organizationWorkflowReducers = {
  organizationWorkflowGetAll: organizationWorkflowGetAllReducer,
  organizationWorkflowGetList: organizationWorkflowGetListReducer,
  organizationWorkflowGetById: organizationWorkflowGetByIdReducer,
  organizationWorkflowPost: organizationWorkflowPostReducer,
  organizationWorkflowPut: organizationWorkflowPutReducer,
  organizationWorkflowDelete: organizationWorkflowDeleteReducer,
};