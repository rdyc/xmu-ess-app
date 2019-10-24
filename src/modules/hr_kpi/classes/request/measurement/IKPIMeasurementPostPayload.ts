import { IBasePayload } from '@generic/interfaces';

export interface IKPIMeasurementPostPayload extends IBasePayload {
  description: string;
  measurementType: string;
  weight?: number;
}