import { IHierarchyList } from '@organization/classes/response/hierarchy';

export interface IWorkflowList {
  uid: string;
  menuUid: string;  
  hierarchyUid: string;  
  hierarchy: IHierarchyList | null;
  priority: number;
}
