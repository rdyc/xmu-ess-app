import { IBaseChanges } from '@generic/interfaces';
import { ICommonSystem } from '@common/classes';

export interface IProjectDocument {
  uid:          string;
  documentType: string;
  document:     ICommonSystem | null;
  isAvailable:  boolean;
  changes:      IBaseChanges | null;
}