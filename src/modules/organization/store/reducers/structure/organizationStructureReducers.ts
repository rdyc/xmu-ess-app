import { organizationStructureDeleteReducer } from './organizationStructureDeleteReducer';
import { organizationStructureGetAllReducer } from './organizationStructureGetAllReducer';
import { organizationStructureGetByIdReducer } from './organizationStructureGetByIdReducer';
import { organizationStructurePostReducer } from './organizationStructurePostReducer';
import { organizationStructurePutReducer } from './organizationStructurePutReducer';

export const organizationStructureReducers = {
  organizationStructureGetAll: organizationStructureGetAllReducer,
  organizationStructureGetById: organizationStructureGetByIdReducer,
  organizationStructurePost: organizationStructurePostReducer,
  organizationStructurePut: organizationStructurePutReducer,
  organizationStructureDelete: organizationStructureDeleteReducer,
};