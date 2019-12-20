import { IBaseChanges } from '@generic/interfaces';
import { IAmount } from './IAmount';

export interface IDocument {
  uid: string;
  documentNotes?: string;
  approvalNotes?: string;
  amount?: IAmount;
  changes?: IBaseChanges;
}