import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IHRMeasurement } from '../measurement';

export interface IHRTemplateItem {
  uid: string;
  templateUid: string;
  categoryType: string;
  category?: ICommonSystem | null;
  measurementUid: string;
  measurement?: IHRMeasurement | null;
  target: string;
  weight: number;
  changes: IBaseChanges | null;
}