import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IHRTemplateItem {
  uid: string;
  templateUid: string;
  categoryType: string;
  category?: ICommonSystem | null;
  measurementUid: string;
  measurement?:  | null;
  target: string;
  weight: number;
  changes: IBaseChanges | null;
}