import { organizationHierarchyReducers } from './hierarchy';
import { organizationStructureReducers } from './structure';
import { organizationWorkflowReducers } from './workflow';

const organizationReducers = {
  ...organizationStructureReducers,
  ...organizationHierarchyReducers,
  ...organizationWorkflowReducers,
};

export default organizationReducers;
