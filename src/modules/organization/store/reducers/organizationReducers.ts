import { organizationHierarchyReducers } from './hierarchy';
import { organizationWorkflowReducers } from './workflow';

const organizationReducers = {
  ...organizationHierarchyReducers,
  ...organizationWorkflowReducers,
};

export default organizationReducers;
