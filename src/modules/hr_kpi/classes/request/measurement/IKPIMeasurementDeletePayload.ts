import { IBasePayload } from '@generic/interfaces';

export interface IKPIMeasurementDeletePayload extends IBasePayload {
  categoryUid: string;
  measurementUid: string;
}