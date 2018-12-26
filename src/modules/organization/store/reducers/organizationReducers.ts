import { organizationHierarchyReducers } from './hierarchy';
import { organizationStructureReducers } from './structure';

const organizationReducers = {
  ...organizationStructureReducers,
  ...organizationHierarchyReducers,
};

export default organizationReducers;
