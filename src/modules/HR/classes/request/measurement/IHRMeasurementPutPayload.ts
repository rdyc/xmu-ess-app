import { IBasePayload } from '@generic/interfaces';

export interface IHRMeasurementPutPayload extends IBasePayload {
  // todo
  description: string;
  measurementType: string;
  weight?: number;
}