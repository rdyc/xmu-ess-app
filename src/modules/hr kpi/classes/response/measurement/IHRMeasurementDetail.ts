import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';

export interface IHRMeasurementDetail {
  uid: string;
  description: string;
  measurementType: string;
  measurement?: ICommonSystem;
  weight: number;
  changes?: IBaseChanges;
}