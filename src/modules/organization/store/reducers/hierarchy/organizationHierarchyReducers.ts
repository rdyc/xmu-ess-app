import { organizationHierarchyDeleteReducer } from './organizationHierarchyDeleteReducer';
import { organizationHierarchyGetAllReducer } from './organizationHierarchyGetAllReducer';
import { organizationHierarchyGetByIdReducer } from './organizationHierarchyGetByIdReducer';
import { organizationHierarchyGetListReducer } from './organizationHierarchyGetListReducer';
import { organizationHierarchyPostReducer } from './organizationHierarchyPostReducer';
import { organizationHierarchyPutReducer } from './organizationHierarchyPutReducer';

export const organizationHierarchyReducers = {
  organizationHierarchyGetAll: organizationHierarchyGetAllReducer,
  organizationHierarchyGetList: organizationHierarchyGetListReducer,
  organizationHierarchyGetById: organizationHierarchyGetByIdReducer,
  organizationHierarchyPost: organizationHierarchyPostReducer,
  organizationHierarchyPut: organizationHierarchyPutReducer,
  organizationHierarchyDelete: organizationHierarchyDeleteReducer,
};