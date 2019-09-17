import { IBaseChanges } from '@generic/interfaces';
import { IKPICategory } from '../category';
import { IKPIMeasurement } from '../measurement';

export interface IKPIFinalItem {
  uid: string;
  kpiUid: string;
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
  achieved: number;
  progress: number;
  score: number;
  changes: IBaseChanges | null;
}