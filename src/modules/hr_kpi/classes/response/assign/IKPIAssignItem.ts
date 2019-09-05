import { IBaseChanges } from '@generic/interfaces';
import { IKPICategory } from '../category';
import { IKPIMeasurement } from '../measurement';

export interface IKPIAssignItem {
  uid: string;
  kpiUid: string;
  isAssignItemInUse: boolean;
  categoryUid: string;
  category?: IKPICategory | null;
  categoryName: string;
  measurementUid: string;
  measurement?: IKPIMeasurement | null;
  measurementDescription: string;
  target: string;
  weight: number;
  threshold?: number;
  amount: number;
  changes: IBaseChanges | null;
}