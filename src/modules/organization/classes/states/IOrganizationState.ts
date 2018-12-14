import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IOrganizationHierarchyAllRequest,
  IOrganizationHierarchyByIdRequest,
  IOrganizationHierarchyDeleteRequest,
  IOrganizationHierarchyListRequest,
  IOrganizationHierarchyPostRequest,
  IOrganizationHierarchyPutRequest,
} from '@organization/classes/queries/hierarchy';
import { IHierarchy, IHierarchyDetail, IHierarchyList } from '@organization/classes/response/hierarchy';

export interface IOrganizationState {
  organizationHierarchyGetAll: IQueryCollectionState<IOrganizationHierarchyAllRequest, IHierarchy>;
  organizationHierarchyGetList: IQueryCollectionState<IOrganizationHierarchyListRequest, IHierarchyList>;
  organizationHierarchyGetById: IQuerySingleState<IOrganizationHierarchyByIdRequest, IHierarchyDetail>;
  organizationHierarchyPost: IQuerySingleState<IOrganizationHierarchyPostRequest, IHierarchy>;
  organizationHierarchyPut: IQuerySingleState<IOrganizationHierarchyPutRequest, IHierarchy>;
  organizationHierarchyDelete: IQuerySingleState<IOrganizationHierarchyDeleteRequest, boolean>;
}