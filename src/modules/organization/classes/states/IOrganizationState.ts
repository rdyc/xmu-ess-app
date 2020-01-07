import { IEmployee } from '@account/classes/response';
import { IEmployeeKPIFinal } from '@account/classes/response/employeeKPIFinal';
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
  IOrganizationStructureSubOrdinateListRequest,
  IOrganizationStructureSubOrdinateTreeKPIFinalRequest,
} from '@organization/classes/queries/structure';
import { 
  IOrganizationWorkflowAllRequest, 
  IOrganizationWorkflowByIdRequest, 
  IOrganizationWorkflowDeleteRequest, 
  IOrganizationWorkflowListRequest,
  IOrganizationWorkflowMenuRequest,
  IOrganizationWorkflowPostRequest,
  IOrganizationWorkflowPutRequest
} from '@organization/classes/queries/workflow';
import { IHierarchy, IHierarchyDetail, IHierarchyList } from '@organization/classes/response/hierarchy';
import { IStructure, IStructureDetail } from '@organization/classes/response/structure';
import { IWorkflow, IWorkflowList } from '@organization/classes/response/workflow';
import { IWorkflowMenu } from '../response/workflow/IWorkflowMenu';

export interface IOrganizationState {
  // structure
  organizationStructureGetAll: IQueryCollectionState<IOrganizationStructureAllRequest, IStructure>;
  organizationStructureGetById: IQuerySingleState<IOrganizationStructureByIdRequest, IStructureDetail>;
  organizationStructureGetSubOrdinateList: IQueryCollectionState<IOrganizationStructureSubOrdinateListRequest, IEmployee>;
  organizationStructureGetSubOrdinateTreeKPIFinal: IQueryCollectionState<IOrganizationStructureSubOrdinateTreeKPIFinalRequest, IEmployeeKPIFinal>;
  organizationStructurePost: IQuerySingleState<IOrganizationStructurePostRequest, IStructure>;
  organizationStructurePut: IQuerySingleState<IOrganizationStructurePutRequest, IStructure>;
  organizationStructureDelete: IQuerySingleState<IOrganizationStructureDeleteRequest, boolean>;

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
  organizationWorkflowGetByMenu: IQuerySingleState<IOrganizationWorkflowMenuRequest, IWorkflowMenu>;
  organizationWorkflowPost: IQuerySingleState<IOrganizationWorkflowPostRequest, IWorkflow>;
  organizationWorkflowPut: IQuerySingleState<IOrganizationWorkflowPutRequest, IWorkflow>;
  organizationWorkflowDelete: IQuerySingleState<IOrganizationWorkflowDeleteRequest, boolean>;
}