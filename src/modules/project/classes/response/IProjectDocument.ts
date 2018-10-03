import { IBaseChanges } from '@generic/interfaces';
import { ICommonSystem } from '@common/interfaces';

export interface IProjectDocument {
  uid:          string;
  documentType: string | null;
  document:     ICommonSystem | null;
  isAvailable:  boolean;
  changes:      IBaseChanges | null;
}