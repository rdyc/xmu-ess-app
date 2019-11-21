import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IKPICategory } from '../category';

export interface IKPIMeasurement {
  uid: string;
  categoryUid: string;
  category?: IKPICategory;
  description: string;
  measurementType: string;
  measurement?: ICommonSystem;
  isInUse: boolean;
  weight: number;
  changes?: IBaseChanges;
}