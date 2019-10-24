import { IBaseChanges } from '@generic/interfaces';

export interface IKPIFinalItem {
  uid: string;
  kpiUid: string;
  categoryName: string;
  measurementDescription: string;
  target: string;
  weight: number;
  threshold?: number;
  amount: number;
  achieved: number;
  progress: number;
  score: number;
  changes?: IBaseChanges;
}