import { IBaseChanges } from '@generic/interfaces';
import { IKPICategory } from '../category';
import { IKPIMeasurement } from '../measurement';

export interface IKPITemplateItem {
  uid: string;
  templateUid: string;
  categoryUid: string;
  category?: IKPICategory | null;
  categoryName: string;
  measurementUid: string;
  measurement?: IKPIMeasurement | null;
  target: string;
  weight: number;
  threshold?: number;
  amount: number;
  changes: IBaseChanges | null;
}