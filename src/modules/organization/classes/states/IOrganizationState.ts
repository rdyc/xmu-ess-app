import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IOrganizationHierarchyAllRequest,
  IOrganizationHierarchyByIdRequest,
  IOrganizationHierarchyDeleteRequest,
  IOrganizationHierarchyListRequest,
  IOrganizationHierarchyPostRequest,
  IOrganizationHierarchyPutRequest,
} from '@organization/classes/queries/hierarchy';
import {
  IOrganizationStructureAllRequest,
  IOrganizationStructureByIdRequest,
  IOrganizationStructureDeleteRequest,
  IOrganizationStructurePostRequest,
  IOrganizationStructurePutRequest,
} from '@organization/classes/queries/structure';
import { IHierarchy, IHierarchyDetail, IHierarchyList } from '@organization/classes/response/hierarchy';
import { IStructure, IStructureDetail } from '@organization/classes/response/structure';

export interface IOrganizationState {
  organizationStructureGetAll: IQueryCollectionState<IOrganizationStructureAllRequest, IStructure>;
  organizationStructureGetById: IQuerySingleState<IOrganizationStructureByIdRequest, IStructureDetail>;
  organizationStructurePost: IQuerySingleState<IOrganizationStructurePostRequest, IStructure>;
  organizationStructurePut: IQuerySingleState<IOrganizationStructurePutRequest, IStructure>;
  organizationStructureDelete: IQuerySingleState<IOrganizationStructureDeleteRequest, boolean>;

  organizationHierarchyGetAll: IQueryCollectionState<IOrganizationHierarchyAllRequest, IHierarchy>;
  organizationHierarchyGetList: IQueryCollectionState<IOrganizationHierarchyListRequest, IHierarchyList>;
  organizationHierarchyGetById: IQuerySingleState<IOrganizationHierarchyByIdRequest, IHierarchyDetail>;
  organizationHierarchyPost: IQuerySingleState<IOrganizationHierarchyPostRequest, IHierarchy>;
  organizationHierarchyPut: IQuerySingleState<IOrganizationHierarchyPutRequest, IHierarchy>;
  organizationHierarchyDelete: IQuerySingleState<IOrganizationHierarchyDeleteRequest, boolean>;
}