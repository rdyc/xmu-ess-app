import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IOrganizationStructureAllRequest,
  IOrganizationStructureByIdRequest,
  IOrganizationStructureDeleteRequest,
  IOrganizationStructurePostRequest,
  IOrganizationStructurePutRequest,
} from '@organization/classes/queries/structure';
import { IStructure, IStructureDetail } from '@organization/classes/response/structure';

export interface IOrganizationState {
  organizationStructureGetAll: IQueryCollectionState<IOrganizationStructureAllRequest, IStructure>;
  organizationStructureGetById: IQuerySingleState<IOrganizationStructureByIdRequest, IStructureDetail>;
  organizationStructurePost: IQuerySingleState<IOrganizationStructurePostRequest, IStructure>;
  organizationStructurePut: IQuerySingleState<IOrganizationStructurePutRequest, IStructure>;
  organizationStructureDelete: IQuerySingleState<IOrganizationStructureDeleteRequest, boolean>;
}