import { organizationStructureDeleteReducer } from './organizationStructureDeleteReducer';
import { organizationStructureGetAllReducer } from './organizationStructureGetAllReducer';
import { organizationStructureGetByIdReducer } from './organizationStructureGetByIdReducer';
import { organizationStructureGetSubOrdinateListReducer } from './organizationStructureGetSubOrdinateListReducer';
import { organizationStructurePostReducer } from './organizationStructurePostReducer';
import { organizationStructurePutReducer } from './organizationStructurePutReducer';

export const organizationStructureReducers = {
  organizationStructureGetAll: organizationStructureGetAllReducer,
  organizationStructureGetById: organizationStructureGetByIdReducer,
  organizationStructureGetSubOrdinateList: organizationStructureGetSubOrdinateListReducer,
  organizationStructurePost: organizationStructurePostReducer,
  organizationStructurePut: organizationStructurePutReducer,
  organizationStructureDelete: organizationStructureDeleteReducer,
};