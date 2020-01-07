import { organizationStructureDeleteReducer } from './organizationStructureDeleteReducer';
import { organizationStructureGetAllReducer } from './organizationStructureGetAllReducer';
import { organizationStructureGetByIdReducer } from './organizationStructureGetByIdReducer';
import { organizationStructureGetSubOrdinateListReducer } from './organizationStructureGetSubOrdinateListReducer';
import { organizationStructureGetSubOrdinateTreeKPIFinalReducer } from './organizationStructureGetSubOrdinateTreeKPIFinalReducer';
import { organizationStructurePostReducer } from './organizationStructurePostReducer';
import { organizationStructurePutReducer } from './organizationStructurePutReducer';

export const organizationStructureReducers = {
  organizationStructureGetAll: organizationStructureGetAllReducer,
  organizationStructureGetById: organizationStructureGetByIdReducer,
  organizationStructureGetSubOrdinateList: organizationStructureGetSubOrdinateListReducer,
  organizationStructureGetSubOrdinateTreeKPIFinal: organizationStructureGetSubOrdinateTreeKPIFinalReducer,
  organizationStructurePost: organizationStructurePostReducer,
  organizationStructurePut: organizationStructurePutReducer,
  organizationStructureDelete: organizationStructureDeleteReducer,
};