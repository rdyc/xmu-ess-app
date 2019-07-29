import { IBasePayload } from '@generic/interfaces';

export interface IHRMeasurementPostPayload extends IBasePayload {
  // todo
  description: string;
  measurementType: string;
  weight?: number;
}