import { IBasePayload } from '@generic/interfaces';

export interface IHRMeasurementDeletePayload extends IBasePayload {
  measurementUid: string;
}