import { ILookupMenu } from '@lookup/classes';
import { IWorkflowList } from './IWorkflowList';

export interface IWorkflowMenu {
  menu?: ILookupMenu;
  hierarchies?: IWorkflowList[];
}
