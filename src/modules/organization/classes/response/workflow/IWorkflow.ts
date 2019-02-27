import { IBaseChanges } from '@generic/interfaces';
import { IHierarchy } from '@organization/classes/response/hierarchy';

export interface IWorkflow {
  uid: string;
  menuUid: string;  
  hierarchyUid: string;  
  hierarchy: IHierarchy | null;
  priority: string;  
  changes?: IBaseChanges | null;
}
