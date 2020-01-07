import { ICommonSystem } from '@common/classes';
import { IKPICategory } from '../category';

export interface IKPIMeasurementList {
  uid: string;
  categoryUid: string;
  category?: IKPICategory;
  description: string;
  measurementType: string;
  measurement?: ICommonSystem;
  isInUse: boolean;
  weight: number;
}