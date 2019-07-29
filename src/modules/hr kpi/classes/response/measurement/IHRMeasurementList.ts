import { ICommonSystem } from '@common/classes';

export interface IHRMeasurementList {
  uid: string;
  description: string;
  measurementType: string;
  measurement?: ICommonSystem;
  weight: number;
}