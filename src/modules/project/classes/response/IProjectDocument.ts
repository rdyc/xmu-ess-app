import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IProjectDocument {
  uid: string;
  documentType: string;
  document: ICommonSystem | null;
  isAvailable: boolean;
  changes: IBaseChanges | null;
}