import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IDocument } from './IDocument';

export interface IFinanceDetail {
  uid: string;
  moduleUid: string;
  module?: ICommonSystem;
  documentUid: string;
  document?: IDocument;
  statusType: string;
  status?: ICommonSystem;
  notes?: string;
  changes?: IBaseChanges;
}