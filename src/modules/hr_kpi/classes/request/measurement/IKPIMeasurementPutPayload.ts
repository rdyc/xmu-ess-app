import { IBasePayload } from '@generic/interfaces';

export interface IKPIMeasurementPutPayload extends IBasePayload {
  description: string;
  measurementType: string;
  weight?: number;
}