import { IBaseChanges } from '@generic/interfaces';

export interface ILookupMenu {
  uid: string;
  name: string;
  description?: string;
  isAdminAccess: boolean;
  changes?: IBaseChanges; 
}