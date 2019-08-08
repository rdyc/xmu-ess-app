import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IKPICategory } from '../category';

export interface IKPIMeasurementDetail {
  uid: string;
  categoryUid: string;
  category?: IKPICategory;
  description: string;
  measurementType: string;
  measurement?: ICommonSystem;
  weight: number;
  changes?: IBaseChanges;
}