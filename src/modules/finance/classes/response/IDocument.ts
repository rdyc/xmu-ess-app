import { IBaseChanges } from '@generic/interfaces';
import { IAmount } from './IAmount';

export interface IDocument {
  uid: string;
  amount?: IAmount | null;
  changes: IBaseChanges;
}