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
  IOrganizationWorkflowAllRequest, 
  IOrganizationWorkflowByIdRequest, 
  IOrganizationWorkflowDeleteRequest, 
  IOrganizationWorkflowListRequest,
  IOrganizationWorkflowPostRequest,
  IOrganizationWorkflowPutRequest
} from '@organization/classes/queries/workflow';
import { IHierarchy, IHierarchyDetail, IHierarchyList } from '@organization/classes/response/hierarchy';
import { IWorkflow, IWorkflowList } from '@organization/classes/response/workflow';

export interface IOrganizationState {
  // hierarchy
  organizationHierarchyGetAll: IQueryCollectionState<IOrganizationHierarchyAllRequest, IHierarchy>;
  organizationHierarchyGetList: IQueryCollectionState<IOrganizationHierarchyListRequest, IHierarchyList>;
  organizationHierarchyGetById: IQuerySingleState<IOrganizationHierarchyByIdRequest, IHierarchyDetail>;
  organizationHierarchyPost: IQuerySingleState<IOrganizationHierarchyPostRequest, IHierarchy>;
  organizationHierarchyPut: IQuerySingleState<IOrganizationHierarchyPutRequest, IHierarchy>;
  organizationHierarchyDelete: IQuerySingleState<IOrganizationHierarchyDeleteRequest, boolean>;

  // workflow
  organizationWorkflowGetAll: IQueryCollectionState<IOrganizationWorkflowAllRequest, IWorkflow>;
  organizationWorkflowGetList: IQueryCollectionState<IOrganizationWorkflowListRequest, IWorkflowList>;
  organizationWorkflowGetById: IQuerySingleState<IOrganizationWorkflowByIdRequest, IWorkflow>;
  organizationWorkflowPost: IQuerySingleState<IOrganizationWorkflowPostRequest, IWorkflow>;
  organizationWorkflowPut: IQuerySingleState<IOrganizationWorkflowPutRequest, IWorkflow>;
  organizationWorkflowDelete: IQuerySingleState<IOrganizationWorkflowDeleteRequest, boolean>;
}